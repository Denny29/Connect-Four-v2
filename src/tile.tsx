type TileProps = {
    bgColor: string
}

export const Tile = ({bgColor}: TileProps) => {
    return <div className={`tile ${bgColor}`}>
    </div>
}
