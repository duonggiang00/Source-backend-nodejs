export const getListProduct = (req,res) => {
    console.log("danh sach san pham")
    return res.send("danh sach san pham")
}
export const getDetailProduct = (req,res) => {
    console.log("chi tiet san pham")
    return res.send("chi tiet san pham")
}
export const createProduct = async (req,res) => {
    try {
        console.log("them san pham")
        return res.send("them san pham")
    } catch (error) {
        console.log(error)
    } 
}
export const updateProduct = (req,res) => {
    console.log("sua san pham")
    return res.send("sua san pham")
}
export const deleteProduct = (req,res) => {
    console.log("xoa san pham")
    return res.send("xoa san pham")
}
export const softDeleteProduct = (req,res) => {
    console.log("xoa san pham")
    return res.send("xoa san pham")
}