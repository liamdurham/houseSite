export interface Listobject {
    Name: string,
    Status: boolean,
    Color:  string,
    Children: Listobject[],
    Parent: string,
    Visible: boolean,
    AssignedDate: string,
    AssignedTo:  string,
    ChildrenVisible: boolean
};
