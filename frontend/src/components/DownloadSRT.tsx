import axios from "axios";
import BACKENDURL from "../global/BackendURL";

// Update the prop type to expect an object with a 'captionPath' key
interface DownloadSRTButtonProps {
  captionPath: string;
}

export function DownloadSRTButton({ captionPath }: DownloadSRTButtonProps) { // Destructure 'captionPath'
  const downloadSRT = async () => {
    try {
      const response = await axios.post<Blob>(BACKENDURL + "get_transcript",{ 
            path: captionPath 
        },
        {
          responseType: 'blob', // This is crucial for getting the response as a Blob
        }
      );

      if (!response) {
        throw new Error('Failed to download file');
      }

      const contentDisposition = response.headers['content-disposition'];
      let filename = 'default-filename.srt'; // Fallback filename

      // Extract filename from Content-Disposition header if available
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        filename = match ? match[1] : filename;
      }

      const blob = response.data; // Access the Blob directly from response.data
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // Filename from header or default
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link); // Clean up
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button className="bg-blue-500 hover:bg-blue-400 hover:shadow-md py-3 px-3 rounded-full text-2xl" onClick={downloadSRT}>Download</button>
  );
}
