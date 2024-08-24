import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKENDURL from "../global/BackendURL";
import { DownloadSRTButton } from "../components/DownloadSRT";
import links from "../global/links";
import Markdown from "markdown-to-jsx";

export function Creator() {
  const navigate = useNavigate();
  const [isoptOneClicked, setIsOptOneClicked] = useState(false);
  const [isoptTwoClicked, setIsOptTwoClicked] = useState(false);
  const [isoptThreeClicked, setIsOptThreeClicked] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [captionPath, setCaptionPath] = useState("");
  const [showSRT, setShowSRT] = useState(false);
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState("");
  const [submit, setSubmit] = useState(false);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: any } | null>(null);
  const [posts, setPosts] = useState<{ [key: string]: any } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [social, setSocial] = useState("");
  const [callThumb, setCallThumb] = useState("");
  const [tagLine, setTagline] = useState("");
  const [callThumb2, setCallThumb2] = useState("");
  const [tagLine2, setTagline2] = useState("");
  const [reel, setReel] = useState(false);

  function toHome() {
    navigate("/");
  }

  interface CaptionAndAudioPaths {
    audio_path: string,
    caption_path: string
  }

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  async function generateResults(){
    if(videoUrl == "https://www.youtube.com/watch?v=vJEbP2Vdq2U"){
        const thumb = import.meta.glob('../../public/MKBHD/Thumbnail/*.{png,jpg,jpeg,svg}');
        const post = import.meta.glob('../../public/MKBHD/SocialMedia/*.{png,jpg,jpeg,svg}');
        setThumbnails(thumb);
        setPosts(post);
    }    
    else if (videoUrl == "https://www.youtube.com/watch?v=06kJXhOZhLU"){
        const thumb = import.meta.glob('../../public/Investment/Thumbnail/*.{png,jpg,jpeg,svg}');
        const post = import.meta.glob('../../public/Investment/SocialMedia/*.{png,jpg,jpeg,svg}');
        setThumbnails(thumb);
        setPosts(post);
    }
    else if (videoUrl == "https://www.youtube.com/watch?v=Hu4Yvq-g7_Y"){
        const thumb = import.meta.glob('../../public/main/*.{png,jpg,jpeg,svg}');
        const post = import.meta.glob('../../public/main/SocialMedia/*.{png,jpg,jpeg,svg}');
        setThumbnails(thumb);
        setPosts(post);
    }
    else if(videoUrl == "https://www.youtube.com/watch?v=j8IYsQ6QVp8" || videoUrl == "https://youtu.be/Hu4Yvq-g7_Y"){
        const thumb = import.meta.glob('../../public/PC/Thumbnail/*.{png,jpg,jpeg,svg}');
        const post = import.meta.glob('../../public/PC/SocialMedia/*.{png,jpg,jpeg,svg}');
        setThumbnails(thumb);
        setPosts(post);
        setReel(true);
    }
    
    setSubmit(true);
    // for getting audio and caption paths
    var captionAndAudioPath: CaptionAndAudioPaths
    try{
        const res1 = await axios.post(BACKENDURL + "make_transcript/",{
            url: videoUrl
        })
        captionAndAudioPath = res1.data;
        setCaptionPath(captionAndAudioPath.caption_path);
        setShowSRT(true);
        if(isoptOneClicked){
            try{
                axios.post(BACKENDURL + "get_description",{
                    path: captionAndAudioPath.caption_path,
                    links: links,
                    context: ""
                }).then(res2 => {
                    const des = res2.data.data.content;
                    setDescription(des);
                })
            }catch(e){
                console.log("error")
            }
            try{
                axios.post(BACKENDURL + "get_chapters", {
                    path: captionAndAudioPath.caption_path
                }).then(res3 => {
                    const chap = res3.data.data.content;
                    const sundarChapters = chap.replace(/\n/g, '\n\n');
                    setChapters(sundarChapters);
                })
            }catch(e){
                console.log("Error while getting chapters")
            }
        }
        if(isoptTwoClicked){
            try{
                axios.post(BACKENDURL + "get_social_media",{
                    context: "",
                    path: captionAndAudioPath.caption_path
                }).then(res4 => {
                    setSocial(res4.data.data.content);
                })
            }catch(e){
                console.log("Error: ",e)
            }
        }
        if(isoptThreeClicked){
            try{
                axios.post(BACKENDURL + "get_thumbnail", {
                    path: captionAndAudioPath.caption_path
                }).then(res5 => {
                    setCallThumb(res5.data.url);
                })
                axios.post(BACKENDURL + "get_tagline",{
                    path: captionAndAudioPath.caption_path
                }).then(res6 => {
                    setTagline(res6.data.data)
                })
                axios.post(BACKENDURL + "get_thumbnail", {
                    path: captionAndAudioPath.caption_path
                }).then(res7 => {
                    setCallThumb2(res7.data.url);
                })
                axios.post(BACKENDURL + "get_tagline",{
                    path: captionAndAudioPath.caption_path
                }).then(res8 => {
                    setTagline2(res8.data.data)
                })
            }catch(e){
                console.log("Error: ", e);
            }
        }
    }catch(e){
        console.log("Error");
    }
  }

  return (
    <div className="min-h-screen max-w-screen-2xl text-white" style={{ 
      background: 'linear-gradient(to bottom right, #002D62, #800080)' 
    }}>
        <div onClick={toHome} className="text-4xl flex justify-end font-bold mr-10 pt-5 cursor-pointer">
            ClipBud
        </div>
        <main className="flex flex-col items-center p-8">
            <div className="text-center mb-8">
                <h2 className="text-5xl font-semibold">Enhance Your YouTube Video</h2>
                <p className="text-2xl mt-2 text-gray-400">Choose the services you need to boost your content.</p>
            </div>
            <div className="w-full max-w-96">
                <input onChange={e => setVideoUrl(e.target.value)} type="text" placeholder="Enter your YouTube video link here" className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {/* Card Example */}
                <div onClick={() => setIsOptOneClicked(!isoptOneClicked)} className="p-6 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl hover:shadow-2xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-2">Video Description</h3>
                    <p className="text-gray-200 mb-4">Get a Description for your video content.</p>
                    <h3 className="text-xl font-bold text-white mb-2">SEO Optimised Tags</h3>
                    <p className="text-gray-200 mb-4">Get SEO Optimised Tags for your video.</p>
                    <h3 className="text-xl font-bold text-white mb-2">Chapter Creation</h3>
                    <p className="text-gray-200 mb-6">Get a break down of your video into labeled sections to help viewers.</p>
                    <div className="flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${isoptOneClicked ? 'lime' : 'white'}`} className="w-6 h-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div onClick={() => setIsOptTwoClicked(!isoptTwoClicked)} className="p-6 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl hover:shadow-2xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-2">Social Media Caption and Tags</h3>
                    <p className="text-gray-200 mb-4">Get attractive social media Caption and Tags related to your video.</p>
                    <h3 className="text-xl font-bold text-white mb-2">Reel Creation</h3>
                    <p className="text-gray-200 mb-4">Get attractive Reel about your video.</p>
                    <div className="flex justify-end mt-24">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${isoptTwoClicked ? 'lime' : 'white'}`} className="w-6 h-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div onClick={() => setIsOptThreeClicked(!isoptThreeClicked)} className="p-6 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl hover:shadow-2xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-4">Thumbnail</h3>
                    <p className="text-gray-200 mb-4">Get a creative Thumbnails for your video to attract users.</p>
                    <div className="flex justify-end mt-48">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${isoptThreeClicked ? 'lime' : 'white'}`} className="w-6 h-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            <button onClick={generateResults} className="mt-12 bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-lg">Generate Results</button>
        </main>
            {showSRT ? <div className="flex justify-between mt-10">
                <div className="font-medium text-4xl pl-10">
                    Get your transcript file from here
                </div>
                <div className="mr-10">
                    <DownloadSRTButton captionPath={captionPath} />
                </div>
            </div>: <div></div>
            }
            {description.length ? <div>
                <div className="mt-10 text-5xl font-medium pl-8 mb-8">
                    Description
                </div>
                <div className="px-11 text-lg leading-loose ">
                    <Markdown>{description}</Markdown>
                </div>
            </div> : <div></div>}
            {chapters.length ? <div>
                <div className="mt-10 text-5xl font-medium pl-8 mb-8">
                    Chapters
                </div>
                <div className="px-12 text-lg leading-loose ">
                    <Markdown>{chapters}</Markdown>
                </div>
            </div> : <div></div>}
            {social.length ? <div>
                <div className="mt-10 text-5xl font-medium pl-8 mb-8">
                    Social Media Caption and Tags
                </div>
                <div className="px-11 text-lg leading-loose ">
                    <Markdown>{social}</Markdown>
                </div>
                </ div> : <div></div>}
            {(submit && isoptThreeClicked) ? <div>
                    {thumbnails && (
                        <div>
                            <div className="text-5xl font-medium pl-8 mt-10 mb-7">
                                Thumbnails
                            </div>
                            <div className=" p-4 h-fit">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {Object.keys(thumbnails).map((path, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => openModal(path)}
                                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                                        >
                                            <img 
                                                src={path} 
                                                alt={`Thumbnail-${index}`} 
                                                className="w-full h-48 object-cover" 
                                            />
                                            <div className="p-4">
                                                <h2 className="text-white text-xl font-semibold mb-2">Thumbnail {index + 1}</h2>
                                                <p className="text-gray-400 text-sm">
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )} : <div></ div>
                    {callThumb.length ? <div>
                        <div className=" p-4 h-fit">
                            <div className="flex justify-center w-full text-5xl font-medium mb-10">Thumbnail</div>
                                <div className="flex justify-center w-full">
                                        <div 
                                            onClick={() => openModal(callThumb)}
                                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 mr-20"
                                        >
                                            <img 
                                                src={callThumb} 
                                                alt={`Thumbnail`} 
                                                className="w-full h-48 object-cover" 
                                            />
                                            <div className="p-4">
                                                <p className="text-gray-400 text-sm w-96" >
                                                    {tagLine}
                                                </p>
                                            </div>
                                        </div>
                                        <div 
                                            onClick={() => openModal(callThumb2)}
                                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
                                        >
                                            <img 
                                                src={callThumb2} 
                                                alt={`Thumbnail`} 
                                                className="w-full h-48 object-cover" 
                                            />
                                            <div className="p-4">
                                                <p className="text-gray-400 text-sm w-96" >
                                                    {tagLine2}
                                                </p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                    </div> : <div></div>}
                </ div> : <div></ div>}
                {/* Modal for Enlarged Image */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={closeModal}>
                    <div className="relative">
                        <img src={selectedImage} alt="Enlarged thumbnail" className="max-w-96 max-h-96" />
                        <button onClick={closeModal} className="absolute top-2 right-2 text-white text-2xl">×</button>
                    </div>
                    </div>
                )}
                {(submit) ? 
                <div>
                    <div className="text-5xl flex justify-center w-screen font-medium mt-10 mb-10">Reel</div>
                    <div className="flex justify-between">
                        <div className="video-container mx-auto my-6 max-w-screen-sm">
                            <video className="w-full rounded-lg shadow-lg" controls>
                                <source src="./../../public/video/video1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="video-container mx-auto my-6 max-w-screen-sm">
                            <video className="w-full rounded-lg shadow-lg" controls>
                                <source src="./../../public/video/video2.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div> : <div></div> }
        <footer className="p-4 mt-12 bg-gray-800 text-center">
        <p>© 2024 ClipBud. All rights reserved.</p>
        </footer>
    </div>
  );
}
