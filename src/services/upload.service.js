import CryptoJS from 'crypto-js'
export const uploadService = {
  uploadImg,
  destroyImg,
}

const API_KEY = '722462595218183'
const SECRET_ID = 'ilZjDS13qbFqIYlLIykb0OCOnnQ'
const CLOUD_NAME = 'donnezwy9'
const UPLOAD_PRESET = 'evfo7s5e'
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image`

async function uploadImg(ev) {
  const UPLOAD_URL = `${BASE_URL}/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

async function destroyImg(publicId) {
  const DESTROY_URL = `${BASE_URL}/destroy`

  try {
    const timestamp = Math.floor(Date.now() / 1000) // Unix timestamp in seconds
    const params = {
      timestamp,
      public_id: publicId,
    }

    // Create a string with the parameters
    const paramString = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join('&')

    // Append your API secret to the end of the string
    const signatureString = `${paramString}${SECRET_ID}`

    const signature = CryptoJS.SHA1(signatureString).toString(CryptoJS.enc.Hex)

    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('api_key', API_KEY)
    formData.append('signature', signature)
    formData.append('timestamp', timestamp)

    const res = await (
      await fetch(DESTROY_URL, {
        method: 'POST',
        body: formData,
      })
    ).json()

    if (res.result !== 'ok') {
      const message = res.result ? res.result : res.error.message
      throw new Error(message)
    }
    return res
  } catch (err) {
    console.error('Failed to destroy image', err)
    throw err
  }
}
