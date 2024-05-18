using AutoMapper;
using Eventit.Data;
using Eventit.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using Server.DataTranferObjects;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly EventitDbContext _context;

        public AuthController(IConfiguration configuration, EventitDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(AuthDto authData)
        {
            Company? company = await _context.Companies.FirstOrDefaultAsync(c => c.Email == authData.Email);

            if (company != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(authData.Password, company.Password))
                {
                    return Unauthorized();
                }

                string token = CreateToken(new[]
                {
                    new Claim("CompanyId", company.Id.ToString()),
                    new Claim("Role", "company"),
                });

                string refreshToken = CreateRefreshToken(new[]
                {
                    new Claim("CompanyId", company.Id.ToString()),
                    new Claim("Role", "company"),
                });

                _context.RefreshTokens.Add(new Models.RefreshToken()
                {
                    Token = refreshToken,
                });
                await _context.SaveChangesAsync();

                return Ok(new LoginResponse()
                {
                    AccessToken = token,
                    RefreshToken = refreshToken,
                    Role = "company",
                    Id = company.Id,
                });
            }

            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Email == authData.Email);

            if (user != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(authData.Password, user.Password))
                {
                    return Unauthorized();
                }

                string token = CreateToken(new[]
                {
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("Role", "user"),
                });

                string refreshToken = CreateRefreshToken(new[]
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("Role", "user"),
                });

                _context.RefreshTokens.Add(new Models.RefreshToken()
                {
                    Token = refreshToken,
                });
                await _context.SaveChangesAsync();

                return Ok(new LoginResponse()
                {
                    AccessToken = token,
                    RefreshToken = refreshToken,
                    Role = "user",
                    Id = user.Id,
                });
            }

            return Unauthorized();
        }

        // POST api/Auth/refresh
        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken(TokenDto tokenData)
        {
            Models.RefreshToken? refreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == tokenData.Token);

            if (refreshToken == null)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:RefreshKey"]!)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
            };

            try
            {
                var principal = tokenHandler.ValidateToken(tokenData.Token, tokenValidationParameters, out SecurityToken validatedToken);

                string newToken = CreateToken(principal.Claims);

                return Ok(new
                {
                    accessToken = newToken
                });
            }
            catch
            {
                return Forbid();
            }
        }

        // POST api/Auth/logout
        [HttpPost("logout")]
        [AllowAnonymous]
        public async Task<IActionResult> Logout(TokenDto tokenData)
        {
            var tokens = await _context.RefreshTokens.Where(t => t.Token == tokenData.Token).ToListAsync();

            _context.RemoveRange(tokens);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private string CreateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:RefreshKey"]!));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(24),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
