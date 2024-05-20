using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveEventBoolFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Free",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "OnlineEvent",
                table: "Events");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Free",
                table: "Events",
                type: "bit",
                nullable: false,
                defaultValueSql: "((1))");

            migrationBuilder.AddColumn<bool>(
                name: "OnlineEvent",
                table: "Events",
                type: "bit",
                nullable: false,
                defaultValueSql: "((1))");
        }
    }
}
