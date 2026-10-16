import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import {
  Upload,
  FileText,
  FlaskConical,
  BrainCircuit,
  ArrowUpRight,
  LoaderCircle,
  CheckCircle2,
  Microscope,
} from "lucide-react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [experimentPlan, setExperimentPlan] = useState(null);
const [planLoading, setPlanLoading] = useState(false);
const [planError, setPlanError] = useState("");
async function generateExperimentPlan() {
  if (!result?.analysis) {
    setPlanError("Analyze a research paper first.");
    return;
  }

  setPlanLoading(true);
  setPlanError("");
  setExperimentPlan(null);

  try {
    const response = await fetch(`${API_URL}/api/experiments/plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        analysis: result.analysis,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to generate experiment plan.");
    }

    setExperimentPlan(data);
  } catch (error) {
    setPlanError(error.message || "Something went wrong.");
  } finally {
    setPlanLoading(false);
  }
}

  function selectFile(selectedFile) {
    setError("");
    setResult(null);

    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setFile(null);
      setError("Please select a PDF research paper.");
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setFile(null);
      setError("The PDF must be 15 MB or smaller.");
      return;
    }

    setFile(selectedFile);
  }

  async function analyzePaper() {
    if (!file) {
      setError("Upload a research paper before starting the analysis.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${API_URL}/api/papers/analyze`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Paper analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the backend. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home">
          <span className="brand-icon">
            <BrainCircuit size={25} />
          </span>
          <span>
            <strong>Research2Build</strong>
            <small>AI RESEARCH ENGINE</small>
          </span>
        </a>

        <div className="nav-label">WORKSPACE</div>
        <a className="nav-item active" href="#home">
          <Microscope size={18} />
          Research lab
        </a>

        <div className="sidebar-card">
          <FlaskConical size={22} />
          <strong>From paper to proof.</strong>
          <p>Turn published ideas into reproducible experiments.</p>
          <span className="status-dot">AI engine configured</span>
        </div>

        <div className="sidebar-footer">
          <span className="online-dot" />
          Local development environment
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <span className="breadcrumb">Workspace / Research lab</span>
          <span className="top-pill">
            <span className="online-dot" />
            Prototype
          </span>
        </header>

        <section className="hero">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            RESEARCH ENGINEERING, REIMAGINED
          </div>
          <h1>
            From research.
            <br />
            <span>To reproducible results.</span>
          </h1>
          <p className="hero-description">
            Upload a machine learning paper. Extract its methodology,
            build an implementation plan, and prepare for real experiments.
          </p>
        </section>

        <section className="workspace-grid">
          <div className="panel upload-panel">
            <div className="panel-heading">
              <div>
                <span className="step-label">STEP 01</span>
                <h2>Source paper</h2>
              </div>
              <FileText size={21} />
            </div>

            <label
              className={`dropzone ${file ? "has-file" : ""}`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                selectFile(event.dataTransfer.files[0]);
              }}
            >
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(event) =>
                  selectFile(event.target.files[0])
                }
              />

              <span className="upload-icon">
                {file ? (
                  <CheckCircle2 size={26} />
                ) : (
                  <Upload size={26} />
                )}
              </span>

              <strong>
                {file ? file.name : "Drop your research paper here"}
              </strong>
              <span className="dropzone-hint">
                {file
                  ? `${(file.size / (1024 * 1024)).toFixed(2)} MB · Selected`
                  : "or click to browse your files"}
              </span>
              <span className="file-format">PDF · MAX 15 MB</span>
            </label>

            <div className="upload-note">
              <CheckCircle2 size={16} />
              PDF text extraction powered by PyMuPDF
            </div>

            <button
              className="primary-button"
              onClick={analyzePaper}
              disabled={loading || !file}
            >
              {loading ? (
                <>
                  <LoaderCircle className="spin" size={18} />
                  Analyzing paper...
                </>
              ) : (
                <>
                  Analyze research paper
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}
          </div>

          <div className="panel process-panel">
            <div className="panel-heading">
              <div>
                <span className="step-label">YOUR PIPELINE</span>
                <h2>Research workflow</h2>
              </div>
              <FlaskConical size={21} />
            </div>

            <div className="workflow">
              {[
                {
                  number: "01",
                  title: "Extract the paper",
                  description: "Read PDF text and page references",
                  state: "ready",
                },
                {
                  number: "02",
                  title: "Understand the method",
                  description: "Identify claims, techniques and settings",
                  state: "ai",
                },
                {
                  number: "03",
                  title: "Plan the experiment",
                  description: "Organize implementation and evaluation",
                  state: "future",
                },
                {
                  number: "04",
                  title: "Validate the results",
                  description: "Tests and measured metrics come next",
                  state: "future",
                },
              ].map((step) => (
                <div className="workflow-item" key={step.number}>
                  <div className={`workflow-number ${step.state}`}>
                    {step.number}
                  </div>
                  <div className="workflow-copy">
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </div>
                  <span className={`workflow-marker ${step.state}`}>
                    {step.state === "ready"
                      ? "READY"
                      : step.state === "ai"
                        ? "AI"
                        : "NEXT"}
                  </span>
                </div>
              ))}
            </div>

            <div className="pipeline-note">
              <BrainCircuit size={19} />
              <p>
                <strong>Powered by NVIDIA Nemotron</strong>
                <span>
                  AI analysis is available through your FastAPI backend.
                </span>
              </p>
            </div>
          </div>
        </section>

        {result && (
          <section className="panel results-panel">
            <div className="results-header">
              <div>
                <span className="step-label">ANALYSIS COMPLETE</span>
                <h2>{result.filename}</h2>
                <p>
                  {result.pages} pages with extracted text ·{" "}
                  {result.characters_extracted.toLocaleString()} characters
                  analyzed
                </p>
              </div>
              <span className="success-pill">
                <CheckCircle2 size={16} /> Complete
              </span>
            </div>

            <div className="report-content">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {result.analysis}
  </ReactMarkdown>
</div>
          </section>
        )}

        {/* Experiment Planner */}
        {result && (
          <section className="panel experiment-plan">
            <div className="panel-heading">
              <div>
                <span className="step-label">STEP 03</span>
                <h2>Experiment Planner</h2>
              </div>
              <FlaskConical size={21} />
            </div>

            <p>
              Turn your research analysis into an actionable experiment plan.
            </p>

            <button
              className="primary-button"
              onClick={generateExperimentPlan}
              disabled={planLoading}
            >
              {planLoading
                ? "Generating plan..."
                : "Generate Experiment Plan"}
            </button>

            {planError && (
              <div className="error-message" role="alert">
                {planError}
              </div>
            )}

            {experimentPlan && (
              <div className="report-content">
                <h3>Research Objective</h3>
                <p>{experimentPlan.research_objective}</p>

                <h3>Proposed Method</h3>
                <p>{experimentPlan.proposed_method}</p>

                <h3>Implementation Steps</h3>
                <ol>
                  {experimentPlan.implementation_steps.map((step, index) => (
                    <li key={`${step.title}-${index}`}>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                      {step.source_pages?.length > 0 && (
                        <small>
                          Source pages: {step.source_pages.join(", ")}
                        </small>
                      )}
                    </li>
                  ))}
                </ol>

                <h3>Dependencies</h3>
                <ul>
                  {experimentPlan.dependencies.map((item, index) => (
                    <li key={`dependency-${index}`}>{item}</li>
                  ))}
                </ul>

                <h3>Evaluation Metrics</h3>
                <ul>
                  {experimentPlan.evaluation_metrics.map((item, index) => (
                    <li key={`metric-${index}`}>{item}</li>
                  ))}
                </ul>

                <h3>Limitations</h3>
                <ul>
                  {experimentPlan.limitations.map((item, index) => (
                    <li key={`limitation-${index}`}>{item}</li>
                  ))}
                </ul>

                <h3>Assumptions</h3>
                <ul>
                  {experimentPlan.assumptions.map((item, index) => (
                    <li key={`assumption-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
        <footer className="page-footer">
          <span>RESEARCH2BUILD AI · EXPERIMENT ENGINEERING</span>
          <span>Built for reproducible research</span>
        </footer>
      </main>
    </div>
  );
}
