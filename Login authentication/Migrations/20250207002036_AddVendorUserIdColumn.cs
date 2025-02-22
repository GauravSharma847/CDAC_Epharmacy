using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Login_authentication.Migrations
{
    /// <inheritdoc />
    public partial class AddVendorUserIdColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VendorProducts_Users_VendorUserId",
                table: "VendorProducts");

            migrationBuilder.DropIndex(
                name: "IX_VendorProducts_VendorUserId",
                table: "VendorProducts");

            migrationBuilder.RenameColumn(
                name: "VendorUserId",
                table: "VendorProducts",
                newName: "vendor_user_id");

            migrationBuilder.AddColumn<byte[]>(
                name: "image",
                table: "VendorProducts",
                type: "longblob",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "VendorProducts");

            migrationBuilder.RenameColumn(
                name: "vendor_user_id",
                table: "VendorProducts",
                newName: "VendorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_VendorProducts_VendorUserId",
                table: "VendorProducts",
                column: "VendorUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorProducts_Users_VendorUserId",
                table: "VendorProducts",
                column: "VendorUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
