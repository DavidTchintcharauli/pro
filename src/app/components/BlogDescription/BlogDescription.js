    export default function BlogDesription ({heading, description}) {
        const descriptionParagraphs = [...description];
        
        return(
            <div>
                <h1>{heading}</h1>
                {descriptionParagraphs.map((paragraph, index)=>{
                    return <p key={index}>{paragraph}</p>
                })}
            </div>
        )
    }