using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eventit.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //            migrationBuilder.CreateTable(
            //                name: "Company",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false)
            //                        .Annotation("SqlServer:Identity", "1, 1"),
            //                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
            //                    PhoneNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
            //                    Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
            //                    Password = table.Column<int>(type: "int", nullable: false),
            //                    RegistrationDate = table.Column<DateTime>(type: "date", nullable: false, defaultValueSql: "(getdate())"),
            //                    Verified = table.Column<bool>(type: "bit", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_Company", x => x.Id);
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "Place",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false)
            //                        .Annotation("SqlServer:Identity", "1, 1"),
            //                    Address = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
            //                    Rating = table.Column<decimal>(type: "decimal(2,2)", nullable: false),
            //                    ReviewsCount = table.Column<int>(type: "int", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_Place", x => x.Id);
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "User",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false)
            //                        .Annotation("SqlServer:Identity", "1, 1"),
            //                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //                    Patronymic = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //                    PhoneNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
            //                    Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
            //                    Password = table.Column<int>(type: "int", nullable: false),
            //                    DateOfBirth = table.Column<DateTime>(type: "date", nullable: true),
            //                    RegistrationDate = table.Column<DateTime>(type: "date", nullable: false, defaultValueSql: "(getdate())")
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK__User__3214EC074C34685E", x => x.Id);
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "CompanyContactPerson",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false),
            //                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //                    Patronymic = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
            //                    PhoneNumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
            //                    Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_CompanyContactPerson", x => x.Id);
            //                    table.ForeignKey(
            //                        name: "FK_ContactPersonCompany",
            //                        column: x => x.Id,
            //                        principalTable: "Company",
            //                        principalColumn: "Id",
            //                        onDelete: ReferentialAction.Cascade);
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "CompanyProfilePicture",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false),
            //                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK__CompanyP__3214EC07959F7D49", x => x.Id);
            //                    table.ForeignKey(
            //                        name: "FK_ProfilePictureCompany",
            //                        column: x => x.Id,
            //                        principalTable: "Company",
            //                        principalColumn: "Id",
            //                        onDelete: ReferentialAction.Cascade);
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "MessageSender",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false)
            //                        .Annotation("SqlServer:Identity", "1, 1"),
            //                    UserId = table.Column<int>(type: "int", nullable: true),
            //                    CompanyId = table.Column<int>(type: "int", nullable: true)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_MessageSender", x => x.Id);
            //                    table.ForeignKey(
            //                        name: "FK_MessageSenderCompany",
            //                        column: x => x.CompanyId,
            //                        principalTable: "Company",
            //                        principalColumn: "Id");
            //                    table.ForeignKey(
            //                        name: "FK_MessageSenderUser",
            //                        column: x => x.UserId,
            //                        principalTable: "User",
            //                        principalColumn: "Id");
            //                });

            migrationBuilder.CreateTable(
    name: "Notifications",
    columns: table => new
    {
        Id = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
        Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
        Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
        CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
        UserId = table.Column<int>(type: "int", nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Notifications", x => x.Id);
        table.ForeignKey(
            name: "FK_Notifications_User_UserId",
            column: x => x.UserId,
            principalTable: "User",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    });

            //            migrationBuilder.CreateTable(
            //                name: "Organizer",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false)
            //                        .Annotation("SqlServer:Identity", "1, 1"),
            //                    UserId = table.Column<int>(type: "int", nullable: true),
            //                    CompanyId = table.Column<int>(type: "int", nullable: true),
            //                    Rating = table.Column<decimal>(type: "decimal(2,2)", nullable: false),
            //                    EventsCount = table.Column<int>(type: "int", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_Organizer", x => x.Id);
            //                    table.ForeignKey(
            //                        name: "FK_OrganizerCompany",
            //                        column: x => x.CompanyId,
            //                        principalTable: "Company",
            //                        principalColumn: "Id");
            //                    table.ForeignKey(
            //                        name: "FK_OrganizerUser",
            //                        column: x => x.UserId,
            //                        principalTable: "User",
            //                        principalColumn: "Id");
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "UserProfilePicture",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false),
            //                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK__UserProf__3214EC07CDF0039A", x => x.Id);
            //                    table.ForeignKey(
            //                        name: "FK_ProfilePictureUser",
            //                        column: x => x.Id,
            //                        principalTable: "User",
            //                        principalColumn: "Id",
            //                        onDelete: ReferentialAction.Cascade);
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "Event",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false)
            //                        .Annotation("SqlServer:Identity", "1, 1"),
            //                    OrganizerId = table.Column<int>(type: "int", nullable: false),
            //                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
            //                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
            //                    StartDate = table.Column<DateTime>(type: "datetime", nullable: false),
            //                    EndDate = table.Column<DateTime>(type: "datetime", nullable: false),
            //                    OnlineEvent = table.Column<bool>(type: "bit", nullable: false),
            //                    PlaceId = table.Column<int>(type: "int", nullable: true),
            //                    AgeRestriction = table.Column<int>(type: "int", nullable: false),
            //                    EntranceFee = table.Column<decimal>(type: "decimal(9,2)", nullable: true, defaultValueSql: "((0))"),
            //                    Free = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_Event", x => x.Id);
            //                    table.ForeignKey(
            //                        name: "FK_EventOrganizer",
            //                        column: x => x.OrganizerId,
            //                        principalTable: "Organizer",
            //                        principalColumn: "Id",
            //                        onDelete: ReferentialAction.Cascade);
            //                    table.ForeignKey(
            //                        name: "FK_EventPlace",
            //                        column: x => x.PlaceId,
            //                        principalTable: "Place",
            //                        principalColumn: "Id");
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "PlaceReview",
            //                columns: table => new
            //                {
            //                    OrganizerId = table.Column<int>(type: "int", nullable: false),
            //                    PlaceId = table.Column<int>(type: "int", nullable: false),
            //                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
            //                    Grade = table.Column<int>(type: "int", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_PlaceReview", x => new { x.OrganizerId, x.PlaceId });
            //                    table.ForeignKey(
            //                        name: "FK_PlaceReview_Organizer",
            //                        column: x => x.OrganizerId,
            //                        principalTable: "Organizer",
            //                        principalColumn: "Id");
            //                    table.ForeignKey(
            //                        name: "FK_PlaceReview_Place",
            //                        column: x => x.PlaceId,
            //                        principalTable: "Place",
            //                        principalColumn: "Id");
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "Chat",
            //                columns: table => new
            //                {
            //                    EventId = table.Column<int>(type: "int", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_Chat", x => x.EventId);
            //                    table.ForeignKey(
            //                        name: "FK_ChatEvent",
            //                        column: x => x.EventId,
            //                        principalTable: "Event",
            //                        principalColumn: "Id",
            //                        onDelete: ReferentialAction.Cascade);
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "EventPhoto",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false),
            //                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_EventPhoto", x => x.Id);
            //                    table.ForeignKey(
            //                        name: "FK_EventPhotoEvent",
            //                        column: x => x.Id,
            //                        principalTable: "Event",
            //                        principalColumn: "Id",
            //                        onDelete: ReferentialAction.Cascade);
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "EventReview",
            //                columns: table => new
            //                {
            //                    UserId = table.Column<int>(type: "int", nullable: false),
            //                    EventId = table.Column<int>(type: "int", nullable: false),
            //                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
            //                    Grade = table.Column<int>(type: "int", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_EventReview", x => new { x.UserId, x.EventId });
            //                    table.ForeignKey(
            //                        name: "FK_EventReview_Event",
            //                        column: x => x.EventId,
            //                        principalTable: "Event",
            //                        principalColumn: "Id");
            //                    table.ForeignKey(
            //                        name: "FK_EventReview_User",
            //                        column: x => x.UserId,
            //                        principalTable: "User",
            //                        principalColumn: "Id");
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "UserEvent",
            //                columns: table => new
            //                {
            //                    UsersId = table.Column<int>(type: "int", nullable: false),
            //                    EventsId = table.Column<int>(type: "int", nullable: false)
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_UserEvent", x => new { x.UsersId, x.EventsId });
            //                    table.ForeignKey(
            //                        name: "FK_UserEvent_Event",
            //                        column: x => x.EventsId,
            //                        principalTable: "Event",
            //                        principalColumn: "Id");
            //                    table.ForeignKey(
            //                        name: "FK_UserEvent_User",
            //                        column: x => x.UsersId,
            //                        principalTable: "User",
            //                        principalColumn: "Id");
            //                });

            //            migrationBuilder.CreateTable(
            //                name: "Message",
            //                columns: table => new
            //                {
            //                    Id = table.Column<int>(type: "int", nullable: false)
            //                        .Annotation("SqlServer:Identity", "1, 1"),
            //                    SenderId = table.Column<int>(type: "int", nullable: false),
            //                    ChatId = table.Column<int>(type: "int", nullable: false),
            //                    MessageText = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
            //                    SendingTime = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
            //                },
            //                constraints: table =>
            //                {
            //                    table.PrimaryKey("PK_Message", x => x.Id);
            //                    table.ForeignKey(
            //                        name: "FK_MessageChat",
            //                        column: x => x.ChatId,
            //                        principalTable: "Chat",
            //                        principalColumn: "EventId");
            //                    table.ForeignKey(
            //                        name: "FK_MessageMessageSender",
            //                        column: x => x.SenderId,
            //                        principalTable: "MessageSender",
            //                        principalColumn: "Id");
            //                });

            //            migrationBuilder.CreateIndex(
            //                name: "IX_Event_OrganizerId",
            //                table: "Event",
            //                column: "OrganizerId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_Event_PlaceId",
            //                table: "Event",
            //                column: "PlaceId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_EventReview_EventId",
            //                table: "EventReview",
            //                column: "EventId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_Message_ChatId",
            //                table: "Message",
            //                column: "ChatId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_Message_SenderId",
            //                table: "Message",
            //                column: "SenderId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_MessageSender_CompanyId",
            //                table: "MessageSender",
            //                column: "CompanyId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_MessageSender_UserId",
            //                table: "MessageSender",
            //                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_Organizer_CompanyId",
            //                table: "Organizer",
            //                column: "CompanyId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_Organizer_UserId",
            //                table: "Organizer",
            //                column: "UserId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_PlaceReview_PlaceId",
            //                table: "PlaceReview",
            //                column: "PlaceId");

            //            migrationBuilder.CreateIndex(
            //                name: "IX_UserEvent_EventsId",
            //                table: "UserEvent",
            //                column: "EventsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanyContactPerson");

            migrationBuilder.DropTable(
                name: "CompanyProfilePicture");

            migrationBuilder.DropTable(
                name: "EventPhoto");

            migrationBuilder.DropTable(
                name: "EventReview");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "PlaceReview");

            migrationBuilder.DropTable(
                name: "UserEvent");

            migrationBuilder.DropTable(
                name: "UserProfilePicture");

            migrationBuilder.DropTable(
                name: "Chat");

            migrationBuilder.DropTable(
                name: "MessageSender");

            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.DropTable(
                name: "Organizer");

            migrationBuilder.DropTable(
                name: "Place");

            migrationBuilder.DropTable(
                name: "Company");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
