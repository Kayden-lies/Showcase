import React, { useState } from 'react';
import { 
  Users, 
  Layers, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Send, 
  Github, 
  ExternalLink, 
  Video, 
  FileText, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShowcaseSubmission, ShowcaseFormErrors } from '../../types';
import { submitShowcaseProject, isValidUrl, isValidEmail } from '../../utils/showcaseService';

const INITIAL_FORM_STATE: ShowcaseSubmission = {
  teamName: '',
  teamRepresentative: '',
  contactEmail: '',
  organization: '',
  teamMembers: '',
  socialHandles: '',
  projectName: '',
  shortDescription: '',
  problemStatement: '',
  solutionApproach: '',
  techStack: '',
  repositoryUrl: '',
  prototypeUrl: '',
  demoVideoUrl: '',
  documentationUrl: '',
  consentGiven: false,
};

export default function ShowcaseForm() {
  const [formData, setFormData] = useState<ShowcaseSubmission>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ShowcaseFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ShowcaseSubmission | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change if present
    if (errors[name as keyof ShowcaseSubmission]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ShowcaseSubmission];
        return next;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name as keyof ShowcaseSubmission]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ShowcaseSubmission];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: ShowcaseFormErrors = {};

    // Team Validations
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    if (!formData.teamRepresentative.trim()) {
      newErrors.teamRepresentative = 'Team representative / lead name is required';
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please provide a valid email address';
    }
    if (!formData.organization.trim()) {
      newErrors.organization = 'College or Organization is required';
    }
    if (!formData.teamMembers.trim()) {
      newErrors.teamMembers = 'Please list your team members';
    }

    // Project Validations
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    } else if (formData.shortDescription.trim().length < 15) {
      newErrors.shortDescription = 'Please provide at least 15 characters';
    }
    if (!formData.problemStatement.trim()) {
      newErrors.problemStatement = 'Problem statement is required';
    }
    if (!formData.solutionApproach.trim()) {
      newErrors.solutionApproach = 'Solution / technical approach is required';
    }
    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Please specify the technology / tech stack used';
    }

    // URL Validations
    if (formData.repositoryUrl && !isValidUrl(formData.repositoryUrl)) {
      newErrors.repositoryUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }
    if (formData.prototypeUrl && !isValidUrl(formData.prototypeUrl)) {
      newErrors.prototypeUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }
    if (formData.demoVideoUrl && !isValidUrl(formData.demoVideoUrl)) {
      newErrors.demoVideoUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }
    if (formData.documentationUrl && !isValidUrl(formData.documentationUrl)) {
      newErrors.documentationUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }

    // Consent Checkbox
    if (!formData.consentGiven) {
      newErrors.consentGiven = 'You must grant permission to feature your project before submitting';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      // Scroll to the first error
      const firstErrorElement = document.querySelector('[data-has-error="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitShowcaseProject(formData);
      if (result.success && result.data) {
        setSubmittedData(result.data);
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setErrors((prev) => ({
          ...prev,
          form: result.error || 'Failed to submit project. Please try again.',
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: 'An unexpected connection error occurred. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setIsSuccess(false);
    setSubmittedData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-20">
      <AnimatePresence mode="wait">
        {isSuccess && submittedData ? (
          /* SUCCESS STATE */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-10 shadow-2xl backdrop-blur-md"
          >
            <div className="flex flex-col items-center text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full mb-3">
                Submission Received
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight mb-4">
                Project Submitted
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
                Thank you for sharing your HOP 2026 project with AIDN. We&apos;ll review your submission and feature selected projects across the AIDN community.
              </p>

              <div className="w-full bg-zinc-950/80 border border-zinc-800/90 rounded-xl p-5 text-left mb-8 space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                  <div>
                    <span className="text-xs font-mono text-zinc-500 block uppercase">Project</span>
                    <span className="text-base font-bold text-zinc-100">{submittedData.projectName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-500 block uppercase">Team</span>
                    <span className="text-sm font-semibold text-blue-400">{submittedData.teamName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-zinc-500 block">Representative:</span>
                    <span className="text-zinc-300 font-medium">{submittedData.teamRepresentative}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Contact:</span>
                    <span className="text-zinc-300 font-medium">{submittedData.contactEmail}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Organization:</span>
                    <span className="text-zinc-300 font-medium">{submittedData.organization}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Tech Stack:</span>
                    <span className="text-zinc-300 font-medium truncate block">{submittedData.techStack}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors border border-zinc-700 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Submit Another Project
                </button>

                <a
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-900/30 cursor-pointer"
                >
                  Return to AIDN Home
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUBMISSION FORM */
          <motion.div
            key="submission-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl overflow-hidden backdrop-blur-sm"
          >
            {/* Form Top Bar */}
            <div className="border-b border-zinc-800/80 px-6 py-5 sm:px-8 bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  HOP 2026 Project Submission Form
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Fill out your hackathon deliverable details below. All finalist & participant teams are welcome.
                </p>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 self-start sm:self-auto bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md">
                * Indicates required
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-10">
              {/* Form Global Error */}
              {errors.form && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Submission Issue</p>
                    <p className="text-xs text-red-300/90 mt-0.5">{errors.form}</p>
                  </div>
                </div>
              )}

              {/* SECTION 1: TEAM */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      Team Information
                    </h3>
                    <p className="text-xs text-zinc-400">Team identity, representative, and contact information.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Team Name */}
                  <div className="space-y-1.5" data-has-error={!!errors.teamName}>
                    <label htmlFor="teamName" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Team Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="teamName"
                      name="teamName"
                      type="text"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="e.g. NeuralByte Labs"
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                        errors.teamName ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                      } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.teamName && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.teamName}
                      </p>
                    )}
                  </div>

                  {/* College / Organization */}
                  <div className="space-y-1.5" data-has-error={!!errors.organization}>
                    <label htmlFor="organization" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      College / Organization <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="e.g. COEP Tech University / Freelance"
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                        errors.organization ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                      } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.organization && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.organization}
                      </p>
                    )}
                  </div>

                  {/* Team Representative's Name */}
                  <div className="space-y-1.5" data-has-error={!!errors.teamRepresentative}>
                    <label htmlFor="teamRepresentative" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Team Representative / Lead <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="teamRepresentative"
                      name="teamRepresentative"
                      type="text"
                      value={formData.teamRepresentative}
                      onChange={handleInputChange}
                      placeholder="e.g. Aarav Sharma"
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                        errors.teamRepresentative ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                      } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.teamRepresentative && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.teamRepresentative}
                      </p>
                    )}
                  </div>

                  {/* Contact Email */}
                  <div className="space-y-1.5" data-has-error={!!errors.contactEmail}>
                    <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Contact Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="team.lead@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                        errors.contactEmail ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                      } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.contactEmail && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.contactEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-1.5" data-has-error={!!errors.teamMembers}>
                  <label htmlFor="teamMembers" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Team Members <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="teamMembers"
                    name="teamMembers"
                    type="text"
                    value={formData.teamMembers}
                    onChange={handleInputChange}
                    placeholder="e.g. Aarav Sharma, Priya Patel, Rohan Deshmukh"
                    className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                      errors.teamMembers ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                    } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                  />
                  <p className="text-[11px] text-zinc-500">
                    List all team members separated by commas so everyone receives recognition.
                  </p>
                  {errors.teamMembers && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.teamMembers}
                    </p>
                  )}
                </div>

                {/* Social Handles (Optional) */}
                <div className="space-y-1.5">
                  <label htmlFor="socialHandles" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Social Handles <span className="text-zinc-500 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="socialHandles"
                    name="socialHandles"
                    type="text"
                    value={formData.socialHandles}
                    onChange={handleInputChange}
                    placeholder="e.g. Twitter: @aarav_dev, GitHub: @aaravsharma, LinkedIn: in/aarav"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all"
                  />
                  <p className="text-[11px] text-zinc-500">
                    Team or individual X/Twitter, LinkedIn, or GitHub handles for tagging in posts.
                  </p>
                </div>
              </div>

              {/* SECTION 2: PROJECT */}
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-800/60 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-sky-400" />
                      Project Blueprint
                    </h3>
                    <p className="text-xs text-zinc-400">Describe what your team built during Hackers Occupied Pune.</p>
                  </div>
                </div>

                {/* Project Name */}
                <div className="space-y-1.5" data-has-error={!!errors.projectName}>
                  <label htmlFor="projectName" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Project Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="projectName"
                    name="projectName"
                    type="text"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder="e.g. NeuroShield AI"
                    className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                      errors.projectName ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                    } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.projectName && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.projectName}
                    </p>
                  )}
                </div>

                {/* Short Description */}
                <div className="space-y-1.5" data-has-error={!!errors.shortDescription}>
                  <div className="flex items-center justify-between">
                    <label htmlFor="shortDescription" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      Short Project Description <span className="text-blue-400">*</span>
                    </label>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {formData.shortDescription.length} chars
                    </span>
                  </div>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    rows={3}
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="A concise 1-3 sentence summary of what your project does and its core value proposition..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                      errors.shortDescription ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                    } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all leading-relaxed`}
                  />
                  {errors.shortDescription && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.shortDescription}
                    </p>
                  )}
                </div>

                {/* Problem Statement */}
                <div className="space-y-1.5" data-has-error={!!errors.problemStatement}>
                  <label htmlFor="problemStatement" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Problem Statement <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="problemStatement"
                    name="problemStatement"
                    rows={3}
                    value={formData.problemStatement}
                    onChange={handleInputChange}
                    placeholder="What specific problem, bottleneck, or real-world challenge does your hackathon project solve?"
                    className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                      errors.problemStatement ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                    } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all leading-relaxed`}
                  />
                  {errors.problemStatement && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.problemStatement}
                    </p>
                  )}
                </div>

                {/* Solution / Approach */}
                <div className="space-y-1.5" data-has-error={!!errors.solutionApproach}>
                  <label htmlFor="solutionApproach" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Solution / Approach <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="solutionApproach"
                    name="solutionApproach"
                    rows={4}
                    value={formData.solutionApproach}
                    onChange={handleInputChange}
                    placeholder="How did your team solve this problem? Explain your architecture, algorithms, user flow, or technical innovations..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                      errors.solutionApproach ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                    } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all leading-relaxed`}
                  />
                  {errors.solutionApproach && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.solutionApproach}
                    </p>
                  )}
                </div>

                {/* Technology / Tech Stack */}
                <div className="space-y-1.5" data-has-error={!!errors.techStack}>
                  <label htmlFor="techStack" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Technology / Tech Stack <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="techStack"
                    name="techStack"
                    type="text"
                    value={formData.techStack}
                    onChange={handleInputChange}
                    placeholder="e.g. Next.js, PyTorch, Rust, FastAPI, WebSockets, Tailwind CSS, PostgreSQL"
                    className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                      errors.techStack ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                    } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                  />
                  <p className="text-[11px] text-zinc-500">
                    Mention frameworks, libraries, cloud tools, hardware, and AI models utilized.
                  </p>
                  {errors.techStack && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.techStack}
                    </p>
                  )}
                </div>
              </div>

              {/* SECTION 3: PROJECT LINKS */}
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-3 border-b border-zinc-800/80 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center text-indigo-400 font-mono text-xs font-bold">
                    03
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-indigo-400" />
                      Project Links & Media
                    </h3>
                    <p className="text-xs text-zinc-400">Repositories, live URLs, demo videos, and presentation slides.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* GitHub / Repository */}
                  <div className="space-y-1.5" data-has-error={!!errors.repositoryUrl}>
                    <label htmlFor="repositoryUrl" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      <Github className="w-3.5 h-3.5 text-zinc-400" />
                      GitHub / Repository
                    </label>
                    <input
                      id="repositoryUrl"
                      name="repositoryUrl"
                      type="url"
                      value={formData.repositoryUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/org/repo"
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                        errors.repositoryUrl ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                      } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.repositoryUrl && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.repositoryUrl}
                      </p>
                    )}
                  </div>

                  {/* Prototype / Live Project */}
                  <div className="space-y-1.5" data-has-error={!!errors.prototypeUrl}>
                    <label htmlFor="prototypeUrl" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      Prototype / Live Project
                    </label>
                    <input
                      id="prototypeUrl"
                      name="prototypeUrl"
                      type="url"
                      value={formData.prototypeUrl}
                      onChange={handleInputChange}
                      placeholder="https://myproject.app"
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                        errors.prototypeUrl ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                      } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.prototypeUrl && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.prototypeUrl}
                      </p>
                    )}
                  </div>

                  {/* Demo Video */}
                  <div className="space-y-1.5" data-has-error={!!errors.demoVideoUrl}>
                    <label htmlFor="demoVideoUrl" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      <Video className="w-3.5 h-3.5 text-zinc-400" />
                      Demo Video
                    </label>
                    <input
                      id="demoVideoUrl"
                      name="demoVideoUrl"
                      type="url"
                      value={formData.demoVideoUrl}
                      onChange={handleInputChange}
                      placeholder="https://youtube.com/watch?v=... or Loom"
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                        errors.demoVideoUrl ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                      } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.demoVideoUrl && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.demoVideoUrl}
                      </p>
                    )}
                  </div>

                  {/* Documentation / Presentation */}
                  <div className="space-y-1.5" data-has-error={!!errors.documentationUrl}>
                    <label htmlFor="documentationUrl" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                      <FileText className="w-3.5 h-3.5 text-zinc-400" />
                      Documentation / Presentation
                    </label>
                    <input
                      id="documentationUrl"
                      name="documentationUrl"
                      type="url"
                      value={formData.documentationUrl}
                      onChange={handleInputChange}
                      placeholder="https://docs.google.com/presentation/... or Notion"
                      className={`w-full px-4 py-2.5 rounded-xl bg-zinc-950/60 border ${
                        errors.documentationUrl ? 'border-red-500 focus:ring-red-500/40' : 'border-zinc-800 focus:border-blue-500 focus:ring-blue-500/30'
                      } text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                    />
                    {errors.documentationUrl && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.documentationUrl}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 4: SHOWCASE CONSENT */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div 
                  className={`p-4 sm:p-5 rounded-xl bg-zinc-950/70 border ${
                    errors.consentGiven ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800'
                  } transition-colors`}
                  data-has-error={!!errors.consentGiven}
                >
                  <label htmlFor="consentGiven" className="flex items-start gap-3.5 cursor-pointer">
                    <input
                      id="consentGiven"
                      name="consentGiven"
                      type="checkbox"
                      checked={formData.consentGiven}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-zinc-950 shrink-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <span className="text-xs sm:text-sm font-medium text-zinc-200 leading-relaxed block">
                        I give AIDN permission to feature and share this project, submitted materials, screenshots, videos, links and related information on AIDN&apos;s website, social media and other community/media channels.
                        <span className="text-blue-400 ml-1">*</span>
                      </span>
                      <p className="text-[11px] text-zinc-500">
                        Consent is required so our editorial team can highlight your project publicly without copyright friction.
                      </p>
                    </div>
                  </label>

                  {errors.consentGiven && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 font-medium mt-2 pl-7">
                      <AlertCircle className="w-3 h-3" /> {errors.consentGiven}
                    </p>
                  )}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-zinc-500 text-center sm:text-left order-2 sm:order-1">
                  Submissions are reviewed by AIDN mentors & community leads.
                </p>

                <button
                  type="submit"
                  id="btn-submit-project"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[200px] order-1 sm:order-2 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 transition-all duration-150 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                      <span>Submitting Project...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
