const Preview = () => {
    const src = localStorage.getItem('imageCover') || '/public/assets/cover.jpg'
    return (
        <div  className="lightEffect bg-[var(--transparent)] p-5 rounded-lg">
            <div className=" w-[300px] h-[300px] bg-cover  rounded-xl " style={{backgroundImage: `url(${src})`}}></div>
        </div>
    )
}
export default Preview
