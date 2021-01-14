import { Component } from 'react'
import { cloudinaryService } from '../service/cloudinaryService'

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
        return (
            <div className="uploader"
            // style={ uploadStyle }
            >
                <label htmlFor="imageUploader">{isUploading ? 'Uploading....' : 'Upload Image'}</label>
                <input onChange={this.onUploadImg} hidden
                    type="file" accept="image/*" id="imageUploader" />
            </div>
        )
    }
}
