import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'

export class Uploader extends Component {
    state = {
        isUploading: false
    }
    onUploadImg = async ev => {
        this.setState({ isUploading: true })
        const { secure_url } = await cloudinaryService.uploadImg(ev.target.files[0])
        this.setState({ isUploading: false }, () => this.props.onFinishUpload(secure_url))
    }
    render() {
        const { isUploading } = this.state
        const { imgUrl } = this.props
        return (
            <div className={`uploader ${imgUrl && 'img-ready'}`}>
                {imgUrl && <img src={imgUrl} alt="" />}
                <div className="pointer">
                    <label htmlFor="imageUploader" className="pointer"></label>
                    <label htmlFor="imageUploader" className="pointer">{isUploading ? 'Uploading....' : 'Upload Image'}</label>
                </div>
                <input onChange={this.onUploadImg} hidden type="file" accept="image/*" id="imageUploader" />
            </div>
        )
    }
}
