using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Login_authentication.Migrations
{
    /// <inheritdoc />
    public partial class AddVendorUserIdColumnToVendorProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VendorUserId1",
                table: "VendorProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_VendorProducts_vendor_user_id",
                table: "VendorProducts",
                column: "vendor_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_VendorProducts_VendorUserId1",
                table: "VendorProducts",
                column: "VendorUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorProducts_Users_VendorUserId1",
                table: "VendorProducts",
                column: "VendorUserId1",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorProducts_Users_vendor_user_id",
                table: "VendorProducts",
                column: "vendor_user_id",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VendorProducts_Users_VendorUserId1",
                table: "VendorProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorProducts_Users_vendor_user_id",
                table: "VendorProducts");

            migrationBuilder.DropIndex(
                name: "IX_VendorProducts_vendor_user_id",
                table: "VendorProducts");

            migrationBuilder.DropIndex(
                name: "IX_VendorProducts_VendorUserId1",
                table: "VendorProducts");

            migrationBuilder.DropColumn(
                name: "VendorUserId1",
                table: "VendorProducts");
        }
    }
}
