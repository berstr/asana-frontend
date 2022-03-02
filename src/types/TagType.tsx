
interface TagI {
    selected: boolean;
    name: string;
}

export enum TagFilterOptions { Any='Any', All='All'};

//interface TagFilterI {
//    option: TagFilterOptions;
//}

type TagType = TagI;

//export type TagFilterType = TagFilterI;

export default TagType;

