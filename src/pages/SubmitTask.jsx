import { useGlobal } from "../ContextData"
export default function SubmitTask() {
    const { staff } = useGlobal()
  const userid = staff[0]?.employeeId
  const userData = staff.filter(staf => staf.employeeId === userid);
    return (
        <>
            <div style={{ height: "100vh" }}>
                <iframe
                    src={`${userData[0]?.taskForm}/viewform?embedded=true`}
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    title="Submit Task Form"
                />
            </div>

        </>
    )
}