import { Component } from 'react'
import { cloudinaryService } from '../services/cloudinaryService'
import { utilService } from '../services/utilService'

export class Uploader extends Component {
    state = {
        isUploading: false
    }
    onUploadImg = async ev => {
        const { userId, smallMode, onFinishUpload } = this.props
        const imgType = smallMode ? 'profile' : 'banner'
        this.setState({ isUploading: true })
        const { secure_url } = await cloudinaryService.uploadImg(ev.target.files[0], userId)
        this.setState({ isUploading: false }, () => onFinishUpload(secure_url, imgType))
    }
    render() {
        const { isUploading } = this.state
        const { smallMode } = this.props
        const uploaderId = utilService.makeId()
        return (
            <div className={`uploader pointer ${smallMode && 'small-mode'}`}>
                <label htmlFor={uploaderId} className="uploader-logo pointer"></label>
                {!smallMode && <label htmlFor={uploaderId} className="uploader-txt pointer">{isUploading ? 'Uploading...' : 'Upload Image'}</label>}
                <input onChange={this.onUploadImg} hidden type="file" accept="image/*" id={uploaderId} />
            </div>
        )
    }
}
