import { Link } from "react-router-dom";
import Header from "../components/Header";
import TaskProps from "../components/TaskProps";
export default function TasksPage() {
  return (
    <>
<div className="head d-flex align-items-center">
  <h1 className="m-0">Tasks</h1>

  <Link to="./SubmitTask" className="btn btn-primary ms-auto">
    Submit Task
  </Link>
</div>


      <Header />
      <TaskProps />
    </>
  );
}
