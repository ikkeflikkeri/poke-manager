# ADR 004: Computer Vision Model Serving

**Date:** 2026-05-26  
**Status:** Accepted  
**Deciders:** Niels Wouters

## Context

PokeManager uses YOLOv8 for card identification and pre-grading. Need to serve inference at <1s latency per image, with fallback for failures.

## Decision

**Model:** YOLOv8 (medium or large variant)  
**Preprocessing:** ResNet-50 backbone for feature extraction  
**Inference Runtime:** ONNX Runtime (local)  
**Serving:** Embedded in FastAPI backend (same process)  
**Pre-grading:** Start simple (centering offsets, edge detection); defer advanced texture analysis to v2  
**Fallback:** Manual user override if CV fails  

## Rationale

- **YOLOv8:** Fast (60-100 FPS on GPU), accurate (90%+ mAP on COCO), widely used for object detection.
- **ONNX Runtime:** Lightweight, cross-platform, minimal dependencies. Avoids PyTorch/TensorFlow runtime overhead.
- **Local inference:** No API round-trip, sub-second latency. Simpler deployment than cloud inference service.
- **Embedded in FastAPI:** Same process as API; shared GPU/compute. Simplifies deployment; no separate inference service.
- **Simple pre-grading:** Centering detection (bounding box offsets) + edge/corner heuristics are quick wins. Advanced texture analysis (hologram patterns, surface scratches) deferred to v2 after MVP feedback.

## Training & Fine-tuning

- Start with YOLOv8 pre-trained on COCO (general object detection)
- Fine-tune on Pokemon TCG card dataset (~200-500 labeled images)
- Evaluate accuracy on held-out test set (>90% card identification)

## Consequences

- **Positive:** Low latency, simple deployment, single-process. No GPU required (inference works on CPU, slower).
- **Negative:** Model updates require backend restart. GPU memory shared with API requests. No horizontal scaling of inference.
- **Migration path:** If inference becomes bottleneck, extract into separate service (Ray, TorchServe) or use cloud API (Replicate, Modal).

## Related Decisions

- ADR 001: Backend Framework and API Design
