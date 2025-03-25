type TileProps = {
    bgColor: string
    clickProp: () => void
}

export const Tile = ({bgColor, clickProp}: TileProps) => {
    return <div role="button" tabIndex={1} className={`tile ${bgColor}`} onClick={clickProp}>
        <div className={`inner inner-${bgColor}`}>
        </div>
    </div>
}
