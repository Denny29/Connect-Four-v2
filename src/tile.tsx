type TileProps = {
    bgColor: string
    clickProp: () => void
}

export const Tile = ({bgColor, clickProp}: TileProps) => {
    return <div className={`tile ${bgColor}`} onClick={clickProp}>
        <div className={`inner inner-${bgColor}`}></div>
    </div>
}
