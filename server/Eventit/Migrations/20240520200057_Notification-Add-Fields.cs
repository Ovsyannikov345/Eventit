using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class NotificationAddFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ShowFrom",
                table: "Notifications",
                type: "datetime",
                nullable: false,
                defaultValueSql: "(getdate())");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Notifications",
                type: "varchar(20)",
                unicode: false,
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowFrom",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Notifications");
        }
    }
}
