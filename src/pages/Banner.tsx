import Style from '../styles/Banner.module.css'
import Banners, { banner as BannerType } from '../function/Banner'; // Adjust the path based on your project structure
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Swal from "sweetalert2";

const Banner = () => {

    const [bannerData, setBannerData] = useState<BannerType[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [reloadComponent, setReloadComponent] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const bannerInstance = new Banners();
                const data = await bannerInstance.getBanner();
                setBannerData(data);
            } catch (error) {
                console.error("Error fetching banner data:", error);
            }
        };

        fetchBannerData();
    }, [reloadComponent]);

    const handleDeleteBanner = (bannerId: string) => {
        Swal.fire({
            title: 'Delete Banner',
            text: 'Are you sure you want to delete this banner?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const bannerInstance = new Banners();
                    await bannerInstance.deleteBanner(bannerId);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                    setReloadComponent((prev) => !prev);
                } catch (error) {
                    console.error("Error deleting banner:", error);
                }
            }
        });

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreviewImage(previewURL);
            setSelectedFile(file);
        }
    }

    const handleUploadBanner = async () => {
        try {
            if (!selectedFile) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please select a banner to upload!',
                });
                return;
            }

            const bannerInstance = new Banners();
            await bannerInstance.uploadBanner(selectedFile);
            setReloadComponent((prev) => !prev);
            setSelectedFile(null);
            setPreviewImage(null);
        } catch (error) {
            console.error("Error uploading banner:", error);
        }
    };

    return (
        <main className="container flex-col">
            <div className={Style.banner}>
                Upload Banner
                <label htmlFor="uploadInput" className={Style.edit_image}>
                    {previewImage ? (
                        <>
                            <img src={previewImage} alt="Preview" />
                        </>
                    ) : (
                        <div className={Style.upload_box}>
                            <Icon icon="mdi:upload" className={Style.upload_icon} />
                        </div>
                    )}
                    <input
                        type="file"
                        id="uploadInput"
                        accept="image/*"
                        className={Style.upload_input}
                        onChange={handleFileChange}
                    />
                </label>
                <button onClick={handleUploadBanner} className={Style.btn}>Upload</button>
            </div>
            <div className={Style.banner}>
                <h4>Banner List</h4>
                {bannerData.map((banner) => (
                    <div key={banner.id} className={Style.image_container}>
                        <img src={banner.banner} alt={banner.id} />
                        <div
                            onClick={() => handleDeleteBanner(banner.id)}
                            className={Style.remove_img}>
                            <Icon icon="mdi:bin" className={Style.icon} />
                        </div>
                    </div>
                ))}
            </div>

        </main>
    )
}

export default Banner