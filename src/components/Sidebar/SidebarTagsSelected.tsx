import React from 'react';
import TagType from '../../types/TagType'


interface SidebarTagsProps {
    tags: TagType[];
    handleTagSelect: any;
    handleTagDeselectAll: any;
}


export default function SidebarTagsSelected({tags,handleTagSelect, handleTagDeselectAll}: SidebarTagsProps): JSX.Element {

    const clearButton: JSX.Element =    <button 
                                            style={{ border: '1px solid black' , fontSize: '11px', marginRight: '15px', marginBottom: '1px' , color: 'black' }} 
                                            onClick={() => {handleTagDeselectAll(tags)}} >
                                            X
                                        </button>

    // sorts the state variable treeExpansion by project.name
    const sortTags = (tags:TagType[]):TagType[] => {
        const result: TagType[] = tags.sort((a, b) => {
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
        
        let temp: TagType[] = [];

        tags.map(tag => {
            if (tag.name != 'p1' && tag.name != 'p2' && tag.name != 'p3' && tag.name != 'p4') {
                if (tag.selected) {
                    temp.push(tag)
                }
            }
        })

        sortTags(temp).map(tag => {
            result.push(<button     style={{ fontSize: '10px', marginRight: '5px', marginBottom: '1px' , color: 'black' }} 
                                    onClick={() => {handleTagSelect(tag)}}>{tag.name} 
                        </button>)
        })

        if (result.length == 0) {
            return [<div></div>]
        }
        else {
            result.unshift(clearButton);
            return result
        }
    }

    React.useEffect(() => {  },[tags])

    return (
        <div >
            { paintTags().map(tag => { return tag }) }
        </div>
    )

}
