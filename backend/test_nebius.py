
from nebius_client import ask_nebius

if __name__ == "__main__":
    print("Testing Nebius connection...")

    try:
        result = ask_nebius(
            "Explain machine learning experiments in exactly three short bullet points."
        )
        print("\nNebius response:\n")
        print(result)
    except Exception as error:
        print(f"\nRequest failed: {error}")
