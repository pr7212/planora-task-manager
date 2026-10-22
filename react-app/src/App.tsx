import { useState } from 'react';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import type { TaskFilter } from './types/task';

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilter>('all');

  // Derived State Calculations
  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = totalCount - completedCount;
  const progressPercentage = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  // Filter Tasks
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className='min-h-screen bg-[#f7f8fc] text-slate-900 md:flex'>
      {/* Sidebar Layout */}
      <aside className='border-b border-slate-200 bg-white p-5 md:flex md:min-h-screen md:w-64 md:flex-col md:border-b-0 md:border-r md:p-6'>
        <a href='#' className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white'>
            P
          </div>
          <div>
            <h1 className='text-lg font-bold tracking-tight'>Planora</h1>
            <p className='text-xs text-slate-400'>Personal workspace</p>
          </div>
        </a>
        <p className='mb-3 mt-9 text-xs font-semibold uppercase tracking-widest text-slate-400'>
          Workspace
        </p>
        <nav className='flex gap-2 md:flex-col'>
          <a
            href='#tasks'
            className='flex flex-1 items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 md:flex-none'
          >
            <span>▦</span> My tasks
          </a>
          <a
            href='#overview'
            className='flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 md:flex-none'
          >
            <span>◷</span> Overview
          </a>
        </nav>
        <div className='mt-8 hidden rounded-2xl bg-indigo-600 p-5 text-white md:mt-auto md:block'>
          <div className='mb-3 text-2xl'>✦</div>
          <h2 className='font-semibold'>Stay consistent.</h2>
          <p className='mt-2 text-sm leading-6 text-indigo-100'>
            Small steps every day lead to meaningful progress.
          </p>
        </div>
        <div className='mt-5 hidden items-center gap-3 border-t border-slate-100 pt-5 md:flex'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700'>
            P
          </div>
          <div>
            <p className='text-sm font-semibold'>My workspace</p>
            <p className='text-xs text-slate-400'>Personal account</p>
          </div>
        </div>
      </aside>

      {/* Main Workspace Layout */}
      <main className='min-w-0 flex-1 px-4 py-7 sm:px-8 sm:py-10 lg:px-12'>
        <div className='mx-auto max-w-6xl'>
          {/* Header Component Usage */}
          <Header />

          {/* Progress Card Section */}
          <section
            id='overview'
            className='mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg shadow-indigo-100 sm:p-8'
          >
            <div className='flex flex-wrap items-end justify-between gap-5'>
              <div>
                <p className='text-sm font-medium text-indigo-100'>
                  YOUR DAILY PROGRESS
                </p>
                <h3 className='mt-3 text-2xl font-bold sm:text-3xl'>
                  {completedCount === totalCount && totalCount > 0
                    ? 'Everything completed!'
                    : 'Keep moving forward.'}
                </h3>
                <p className='mt-2 text-sm text-indigo-100'>
                  {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'}{' '}
                  left to complete
                </p>
              </div>
              <div className='text-4xl font-bold'>{progressPercentage}%</div>
            </div>
            <div className='mt-6 h-2 overflow-hidden rounded-full bg-white/20'>
              <div
                className='h-full rounded-full bg-white transition-all duration-500'
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </section>

          {/* Statistics Component Usage */}
          <TaskStats
            total={totalCount}
            remaining={remainingCount}
            completed={completedCount}
          />

          {/* Task Workspace Section */}
          <section
            id='tasks'
            className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'
          >
            <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
              <div>
                <h3 className='text-lg font-bold'>Your task list</h3>
                <p className='mt-1 text-sm text-slate-400'>
                  Focus on one thing at a time.
                </p>
              </div>
              <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500'>
                {totalCount} total
              </span>
            </div>

            <TaskForm onAdd={addTask} />

            <div className='mt-6 overflow-hidden rounded-xl border border-slate-100'>
              <TaskFilters filter={filter} onChange={setFilter} />
              <TaskList
                tasks={visibleTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </div>
          </section>

          <footer className='py-6 text-center text-xs text-slate-400'>
            Planora · Built for focus and consistency
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
