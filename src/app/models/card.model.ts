import { List } from "./list.model";

export interface Card {
    id: string;
    title: string;
    description: string;
    position: number;
    list: List
}

export interface CardDto {
    title?: string;
    description?: string;
    position?: number;
    listId?: string;
    boardId?: string;
}