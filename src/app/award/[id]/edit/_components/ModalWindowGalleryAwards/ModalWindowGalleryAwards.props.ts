
import { GalleryItem } from '@/domain/model/gallery/item'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type ModalWindowGalleryAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    textBtn: string
    img?: GalleryItem | undefined
    setImg?: Dispatch<SetStateAction<GalleryItem | undefined>>
    create: boolean
}