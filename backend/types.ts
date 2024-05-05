export type User = {
    username: string;
    password: string;
    name: string;
    email: string;
    phone?: string;
    profileUrl?: string;
};

// Type for Posts
export type Post = {
    userid: string;
    course: string;
    availabilities: string[];
    description: string;
};