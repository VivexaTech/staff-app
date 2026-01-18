import TaskCard from "./TaskCard";
import ComTask from "./ComTask";
import { useGlobal } from "../ContextData";
export default function TaskProps() {
    const { tasks } = useGlobal()
    const userid = "9sVjI5RuQj5QblexVRs0"
    const ComplTask = "Completed"
    const RemTask = ["Pending", "In-Progress"]
    const userTasks = tasks.filter(task => task.assigneeId === userid);
    const ActiveTask = userTasks.filter(taskStat => RemTask.includes(taskStat.status));
    const CompTask = userTasks.filter(taskStat => taskStat.status === ComplTask);
    console.log(ActiveTask)
    console.log(CompTask)

    return (
        <>
            {
                ActiveTask.map((item) => (
                    <TaskCard key={item.id} title={item.title} status={item.status} progress={item.progress} dueDate={item.dueDate} description={item.description} />
                ))
            }
            {
                CompTask.map((item) => (
                    <ComTask key={item.id} title={item.title} status={item.status} progress={item.progress} dueDate={item.dueDate} description={item.description} />
                ))
            }
        </>
    )
}