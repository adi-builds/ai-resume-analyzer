import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [editResumeId, setEditResumeId] = useState(null)

  const navigate = useNavigate()

  const loadAllResumes = () => {
    setAllResumes(dummyResumeData)
  }

  const createResume = async (event) => {
    event.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/res123`)
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setShowUploadResume(false)
    navigate(`/app/builder/res123`)
  }

  const editTitle = async (event) => {
    event.preventDefault()
  }

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm("Are you sure you want to delete this resume?")
    if (confirm) {
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>

        {/* Header */}
        <div className='mb-8'>
          <p className='text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-green-600 to-slate-700 bg-clip-text text-transparent'>
            Welcome, John Doe
          </p>
          <p className='text-sm text-slate-500 mt-1'>
            {allResumes.length} resume{allResumes.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {/* Action cards */}
        <div className='grid grid-cols-2 gap-4 max-w-md mb-10'>
          <button
            onClick={() => setShowCreateResume(true)}
            className='bg-white h-36 flex flex-col items-center justify-center rounded-xl gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-md transition-all duration-300 cursor-pointer'
          >
            <PlusIcon className='size-10 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
            <p className='text-sm font-medium group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
          </button>
          <button
            onClick={() => setShowUploadResume(true)}
            className='bg-white h-36 flex flex-col items-center justify-center rounded-xl gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-md transition-all duration-300 cursor-pointer'
          >
            <UploadCloudIcon className='size-10 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full' />
            <p className='text-sm font-medium group-hover:text-purple-600 transition-all duration-300'>Upload Resume</p>
          </button>
        </div>

        <hr className='border-slate-200 mb-8' />

        {/* Resume grid */}
        {allResumes.length === 0 ? (
          <p className='text-slate-400 text-sm'>No resumes yet — create or upload one to get started.</p>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <button
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  key={resume._id ?? index}
                  className='relative aspect-[3/4] flex flex-col items-center justify-center rounded-xl gap-2 border group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer p-4'
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}18, ${baseColor}40)`,
                    borderColor: `${baseColor}60`
                  }}
                >
                  <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{ color: baseColor }} />
                  <p className='text-sm font-medium group-hover:scale-105 transition-all px-1 text-center line-clamp-2' style={{ color: baseColor }}>
                    {resume.title}
                  </p>
                  <p className='text-xs text-slate-400 px-1 text-center'>
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div onClick={e => e.stopPropagation()} className='absolute top-1.5 right-1.5 group-hover:flex items-center hidden bg-white/70 rounded-md backdrop-blur-sm'>
                    <PencilIcon
                      onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }}
                      className='size-7 p-1.5 hover:bg-white rounded text-slate-700 transition-colors'
                    />
                    <TrashIcon
                      onClick={() => deleteResume(resume._id)}
                      className='size-7 p-1.5 hover:bg-white rounded text-red-600 transition-colors'
                    />
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center px-4'>
            <div onClick={(e) => e.stopPropagation()} className='relative bg-white shadow-2xl rounded-2xl w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4 text-slate-800'>Create a Resume</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full px-4 py-2.5 mb-4 border border-slate-300 rounded-lg outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all'
                required
              />
              <button className='w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors'>Create Resume</button>
              <XIcon
                className='absolute top-4 right-4 size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                onClick={() => { setShowCreateResume(false); setTitle('') }}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center px-4'>
            <div onClick={(e) => e.stopPropagation()} className='relative bg-white shadow-2xl rounded-2xl w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4 text-slate-800'>Upload Resume</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full px-4 py-2.5 mb-4 border border-slate-300 rounded-lg outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all'
                required
              />
              <div>
                <label htmlFor="resume-input" className='block text-sm text-slate-700'>
                  Select Resume File
                  <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-300 border-dashed rounded-xl p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                    {resumeFile ? (
                      <p className='text-green-700 font-medium'>{resumeFile.name}</p>
                    ) : (
                      <>
                        <UploadCloud className='size-12 stroke-1' />
                        <p className='text-sm'>Click to upload</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className='hidden'
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
              </div>
              <button className='w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors'>Upload Resume</button>
              <XIcon
                className='absolute top-4 right-4 size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                onClick={() => { setShowUploadResume(false); setTitle(''); setResumeFile(null) }}
              />
            </div>
          </form>
        )}

        {/* Edit Title Modal */}
        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center px-4'>
            <div onClick={(e) => e.stopPropagation()} className='relative bg-white shadow-2xl rounded-2xl w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4 text-slate-800'>Edit Resume Title</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full px-4 py-2.5 mb-4 border border-slate-300 rounded-lg outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all'
                required
              />
              <button className='w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors'>Update</button>
              <XIcon
                className='absolute top-4 right-4 size-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                onClick={() => { setEditResumeId(''); setTitle('') }}
              />
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard