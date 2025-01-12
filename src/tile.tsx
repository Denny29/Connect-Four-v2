type TileProps = {
    bgColor: string
    clickProp: () => void
    loc?: string
}

export const Tile = ({bgColor, clickProp, loc}: TileProps) => {
    return <div className={`tile ${bgColor}`} onClick={clickProp}>
        <div className={`inner inner-${bgColor}`}>
            {loc}
        </div>
    </div>
}
