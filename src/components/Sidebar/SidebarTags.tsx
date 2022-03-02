import React, { MouseEvent } from 'react';
import TagType from '../../types/TagType'


interface SidebarTagsProps {
    tags: TagType[];
    searchFilter: string;
    handleTagSelect: any;
}


export default function SidebarTags({tags,searchFilter, handleTagSelect}: SidebarTagsProps): JSX.Element {

 // sorts the state variable treeExpansion by project.name
 const sortTagsX = (tags:string[]):string[] => {
    const result: string[] = tags.sort((a, b) => {
        a = a.toLowerCase()
        b = b.toLowerCase() 
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    })
    return result
}

    // sorts the state variable treeExpansion by project.name
    const sortTags = (tags:TagType[]):TagType[] => {
        const result: TagType[] = tags.sort((a, b) => {
            //console.log(`SidebarTags:sortTags - a: ${a} - b: ${b}`) 
            const tag_a:string = a['name'].toLowerCase()
            const tag_b:string = b['name'].toLowerCase()
            if (tag_a < tag_b)
                return -1;
            if (tag_a > tag_b)
                return 1;
            return 0;
        })
        return result
    }

    function paintTags():JSX.Element[] {
        let result: JSX.Element[] = [];
        sortTags(tags).map(tag => {
            if (tag.name != 'p1' && tag.name != 'p2' && tag.name != 'p3' && tag.name != 'p4') {
                let backgroundColor = {}
                let color = {color: 'black'}
                let fontWeight = { fontWeight: 'normal'}
                let border = {  }
                if (tag.selected) {
                    backgroundColor = { backgroundColor: '#b9b4b4' }
                }
                if (searchFilter != '' &&  (tag.name.toLowerCase().indexOf(searchFilter.toLowerCase()) != -1)) {
                    color = { color: '#c43939'}
                    fontWeight = { fontWeight: 'bold'}
                }
                result.push(<button  style={{ ...border,  fontSize: '10px', ...fontWeight,  marginRight: '10px', marginBottom: '5px' , ...backgroundColor, ...color }} onClick={() => {handleTagSelect(tag)}}>{tag.name}</button>)
            }
        })
        return result;
    }

    React.useEffect(() => { paintTags() },[searchFilter, tags])


    return (
        <div >
            { paintTags().map(tag => { return tag }) }
        </div>
    )

}
