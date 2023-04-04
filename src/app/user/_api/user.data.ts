import {IUser} from "@/app/user/_model/user";

export const userData: IUser[] = [
    {id: 1, deptId: 2, firstname: "Денис", lastname: "Шапкарин", email: "dshapk@mail.ru"},

    // Нектарин
    {id: 20, deptId: 4, firstname: "", lastname: "Иванов", email: "dshapk@mail.ru"},

    // Нектарин - отдел продаж
    {id: 2, deptId: 7, firstname: "Сотрудник 1", lastname: "Иванов", email: "dshapk@mail.ru"},
    {id: 3, deptId: 7, firstname: "Сотрудник 2", lastname: "Петров", email: "email2@mail.ru"},
    {id: 4, deptId: 7, firstname: "Сотрудник 3", lastname: "Сидоров", email: "email3@mail.ru"},
    {id: 5, deptId: 7, firstname: "Сотрудник 4", lastname: "Шапкарин", email: "email4@mail.ru"},
    {id: 6, deptId: 7, firstname: "Сотрудник 5", lastname: "Шапкарин", email: "email5@mail.ru"},

    // Отдел Программирования - бэк:
    {id: 7, deptId: 9, firstname: "Нифонт", lastname: "Бусыгин", email: "nifont@mail.ru"},
    {id: 8, deptId: 9, firstname: "Сотрудник 1", lastname: "Иванов", email: "dshapk@mail.ru"},
    {id: 9, deptId: 9, firstname: "Сотрудник 2", lastname: "Петров", email: "email2@mail.ru"},
    {id: 10, deptId: 9, firstname: "Сотрудник 3", lastname: "Сидоров", email: "email3@mail.ru"},

    // Отдел Программирования - фронт:
    {id: 11, deptId: 10, firstname: "Артём", lastname: "Зыков", email: "artem@mail.ru"},
    {id: 12, deptId: 10, firstname: "Сотрудник 1", lastname: "Иванов", email: "dshapk@mail.ru"},
    {id: 13, deptId: 10, firstname: "Сотрудник 2", lastname: "Петров", email: "email2@mail.ru"},
    {id: 14, deptId: 10, firstname: "Сотрудник 3", lastname: "Сидоров", email: "email3@mail.ru"},
    {id: 15, deptId: 10, firstname: "Сотрудник 2", lastname: "Петров", email: "email2@mail.ru"},
    {id: 16, deptId: 10, firstname: "Сотрудник 3", lastname: "Сидоров", email: "email3@mail.ru"},
]