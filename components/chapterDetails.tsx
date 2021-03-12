export default function ChapterDetails({ chapters }) {
    return(
        chapters.map(chapter => <h3>{chapter.text}</h3> )
    )
}
