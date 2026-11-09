// Задание 3
// Вложенные пространства имен для управления пользователями
// 1 Создайте файл `userManagement.ts`, в котором определите пространство имен `UserManagement`.
// 2 Внутри него создайте вложенное пространство имен `Admin`. Внутри `Admin` создайте класс `AdminUser`, который будет иметь свойства для имени, email и прав доступа (например, `isSuperAdmin`).
// 3 Также создайте методы для изменения прав доступа.
// 4 Используйте этот класс в файле `main.ts` для создания администратора и изменения его прав.
// userManagement.ts

export namespace UserManagement {
    export namespace Admin {
        
        export class AdminUser {
            constructor(
                public name: string,
                public email: string,
                private isSuperAdmin: boolean = false
            ) {}

            public checkSuperAdminStatus(): boolean {
                return this.isSuperAdmin;
            }

            public setSuperAdminStatus(status: boolean): void {
                this.isSuperAdmin = status;
                console.log(`Права пользователя ${this.name} обновлены. SuperAdmin: ${this.isSuperAdmin}`);
            }

            public getInfo(): void {
                console.log(`Администратор: ${this.name}, Email: ${this.email}, SuperAdmin: ${this.isSuperAdmin}`);
            }
        }
    }
}