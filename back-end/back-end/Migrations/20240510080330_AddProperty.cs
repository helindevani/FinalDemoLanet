using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class AddProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "POAName",
                table: "Connections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "POANo",
                table: "Connections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "POIName",
                table: "Connections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "POINo",
                table: "Connections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RationState",
                table: "Connections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "POAName",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "POANo",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "POIName",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "POINo",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "RationState",
                table: "Connections");
        }
    }
}
