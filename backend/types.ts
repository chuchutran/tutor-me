export type Person = {
    id: string;
    name: string;
    email: string;
    password: string;
    bearIcon?: string;
    teachingClasses?: string[];
    attendingClasses?: string[];
    bio?: string;
};
export type Tutor = Person;

export type Tutee = Person;

export type Class = {
    title: string;
    tutorsIds: string[];
    tuteesIds: string[];
}

export type Postings = {
    id: string;
    tutorId: string;
    tuteeId?: string;
    dateAndTimes: string; // Example: "Mondays 3 PM - 5 PM, Fridays 12 PM - 4 PM"
    rate: number;
    status: "Available" | "Unavailable"
}