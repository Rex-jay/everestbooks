export interface ILogin {
    email: string;
    password: string;
}

export interface IUser {
    id: Number;
    firstName: string;
    lastName: string;
    email: string;
    DOB: string;
    phoneNumber: string;
    password: string;
    repeat_pwd: string;
}

export interface IAuthor {
    id: Number;
    name: string;
    age: string;
    address: string;
    books: [];
}

export interface IBook {
    authorId: Number;
    bookName: string;
    publishedStatus: string;
    datePublished: Date;
    serialNumber: Number;
    createdAt: Date;
    updatedAt: Date
}


export interface ILogginIn {
    token: string;
    email: string;
}

export interface ILogginToken {
    id: string;
    email: string;
}

