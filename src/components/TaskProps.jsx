import TaskCard from "./TaskCard";
import ComTask from "./ComTask";
import { useGlobal } from "../ContextData";
export default function TaskProps() {
    const { tasks, staff } = useGlobal()
    const userId = staff[0]?.employeeId
    const ComplTask = "Completed"
    const RemTask = ["Pending", "In Progress"]
    const userTasks = tasks.filter(task => task.assigneeId === userId);
    const ActiveTask = userTasks.filter(taskStat => RemTask.includes(taskStat.status));
    const CompTask = userTasks.filter(taskStat => taskStat.status === ComplTask);
    return (
        <>
            {
                ActiveTask.map((item) => (
                    <TaskCard key={item.id} id={item.id} title={item.title} status={item.status} prog={item.progress} dueDate={item.dueDate} description={item.description} />
                ))
            }
            <div className="container mt-4">
                <h6 className="section-title">Previous Tasks</h6>
                {
                    CompTask.map((item) => (
                        <ComTask key={item.id} title={item.title} status={item.status} description={item.description} />
                    ))
                }
            </div>
        </>
    )
}