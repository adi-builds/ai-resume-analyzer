import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { dummyResumeData } from "../assets/assets"
import ResumePreview from "../components/ResumePreview"
import Loader from "../components/Loader"
import { ArrowLeftIcon } from "lucide-react"
import api from "../configs/api"
import toast from "react-hot-toast"


const Preview = () => {
  const {resumeId} = useParams()
  const [isLoading,setIsLoading] = useState(true)
  const [resumeData,setResumeData] = useState(null)

  const loadResume = async()=>{
    try {
      const {data} = await api.get('/api/resumes/public'+resumeId)
      setResumeData(data.resume)
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(()=>{
    loadResume()
  },[])
  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} classes="py-4 bg-white"/>
      </div>
    </div>
  ) : (
    <div>
      {isLoading? <Loader/> :(
        <div className="flex flex-col items-center justify-center h-screen gap-4 bg-slate-50">
          <p className="text-center text-3xl md:text-4xl text-slate-400 font-semibold">Resume not found</p>
          <a href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm font-medium">
            <ArrowLeftIcon className="size-4"/>
            Go back
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview