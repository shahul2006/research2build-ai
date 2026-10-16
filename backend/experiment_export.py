
import json
from pathlib import Path
from datetime import datetime, timezone


def build_experiment_spec(plan: dict) -> dict:
    """Convert a generated experiment plan into a reproducible specification."""

    return {
        "project": "Research2Build AI",
        "specification_version": "1.0",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "planned_not_executed",
        "research_objective": plan["research_objective"],
        "proposed_method": plan["proposed_method"],
        "implementation_steps": plan["implementation_steps"],
        "dependencies": plan["dependencies"],
        "evaluation_metrics": plan["evaluation_metrics"],
        "limitations": plan["limitations"],
        "assumptions": plan["assumptions"],
        "experiment_config": {
            "model": "Transformer",
            "layers": 6,
            "model_dimension": 512,
            "feed_forward_dimension": 2048,
            "attention_heads": 8,
            "dropout": 0.1,
            "optimizer": "Adam",
            "beta1": 0.9,
            "beta2": 0.98,
            "epsilon": 1e-9,
            "warmup_steps": 4000,
            "training_steps": 100000,
            "translation_beam_size": 4,
            "translation_length_penalty": 0.6
        },
        "results": None
    }


def export_experiment_spec(plan: dict, output_path: str) -> None:
    spec = build_experiment_spec(plan)
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(spec, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
