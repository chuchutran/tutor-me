export type User = {
    username: string;
    password: string;
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    email: string;
    availabilities: string[];
    phone?: string;
    profileUrl?: string;
};

// Type for Posts
export type Post = {
    userId: number;
    class: string;
};