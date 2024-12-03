from huggingface_hub import hf_hub_download

hf_hub_download(repo_id='bofenghuang/whisper-large-v3-french-distil-dec8', filename='ggml-model-q5_0.bin', local_dir='./models/whisper-large-v3-french-distil-dec8')