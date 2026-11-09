// Задание 3
// Вложенные пространства имен для управления пользователями
// 1 Создайте файл `userManagement.ts`, в котором определите пространство имен `UserManagement`.
// 2 Внутри него создайте вложенное пространство имен `Admin`. Внутри `Admin` создайте класс `AdminUser`, который будет иметь свойства для имени, email и прав доступа (например, `isSuperAdmin`).
// 3 Также создайте методы для изменения прав доступа.
// 4 Используйте этот класс в файле `main.ts` для создания администратора и изменения его прав.
// userManagement.ts
export var UserManagement;
(function (UserManagement) {
    let Admin;
    (function (Admin) {
        class AdminUser {
            name;
            email;
            isSuperAdmin;
            constructor(name, email, isSuperAdmin = false) {
                this.name = name;
                this.email = email;
                this.isSuperAdmin = isSuperAdmin;
            }
            checkSuperAdminStatus() {
                return this.isSuperAdmin;
            }
            setSuperAdminStatus(status) {
                this.isSuperAdmin = status;
                console.log(`Права пользователя ${this.name} обновлены. SuperAdmin: ${this.isSuperAdmin}`);
            }
            getInfo() {
                console.log(`Администратор: ${this.name}, Email: ${this.email}, SuperAdmin: ${this.isSuperAdmin}`);
            }
        }
        Admin.AdminUser = AdminUser;
    })(Admin = UserManagement.Admin || (UserManagement.Admin = {}));
})(UserManagement || (UserManagement = {}));
//# sourceMappingURL=userManagement.js.map