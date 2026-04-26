import { ResumeView } from "@/components/resume/ResumeView";
import { resumeData } from "@/lib/resume-data";

export default function ResumePage() {
  return <ResumeView data={resumeData} />;
}
