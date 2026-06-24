"use client";

import React, { useState } from "react";
import { Card, TextArea, Button, Avatar } from "@heroui/react";
import { Star } from "@gravity-ui/icons";
import { BsInfoCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { createReview } from "@/lib/actions/reviews";

interface ReviewItem {
  _id?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  lawyerId: string;
  rating: number;
  comment: string;
  createdAt: any;
}

interface LawyerReviewsSectionProps {
  lawyerId: string;
  lawyerEmail: string;
  currentUser: { id: string; name: string; email: string; role: string } | null;
  hiringStatus: "pending" | "accepted" | "rejected" | null;
  initialReviews: ReviewItem[];
  onReviewAdded: (newReview: ReviewItem) => void;
}

export default function LawyerReviewsSection({
  lawyerId,
  lawyerEmail,
  currentUser,
  hiringStatus,
  initialReviews,
  onReviewAdded,
}: LawyerReviewsSectionProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const formatExactDate = (dateData: any) => {
    try {
      const rawDate =
        dateData && typeof dateData === "object" && "$date" in dateData
          ? dateData.$date
          : dateData;
      if (!rawDate) return "Just now";
      return new Date(rawDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Just now";
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!comment.trim()) {
      toast.error("Please write something in your review comment.");
      return;
    }

    setSubmitLoading(true);
    const reviewPayload = {
      lawyerId,
      lawyerEmail,
      clientId: currentUser.id,
      clientName: currentUser.name,
      clientEmail: currentUser.email,
      rating,
      comment,
    };

    try {
      const res = await createReview(reviewPayload, lawyerId);
      if (res) {
        toast.success("Review posted successfully!");
        setComment("");
        setRating(5);

        const optimisticReview: ReviewItem = {
          ...reviewPayload,
          createdAt: new Date().toISOString(),
        };
        onReviewAdded(optimisticReview);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to post review.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const canLeaveReview = currentUser && hiringStatus === "accepted";

  return (
    <Card className="bg-content1 border border-default-100 p-5 rounded-2xl shadow-sm space-y-5 w-full">
      <h3 className="text-base font-bold text-[#0B3A75] dark:text-white">
        Client Reviews
      </h3>

      {/* review form */}
      {canLeaveReview ? (
        <form
          onSubmit={handleReviewSubmit}
          className="space-y-4 bg-default-50 dark:bg-default-100/5 p-4 rounded-xl border border-default-200 w-full"
        >
          <span className="text-xs font-bold text-default-700 block">
            Provide Quality Evaluation
          </span>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform active:scale-95"
              >
                <Star
                  className={`size-5 ${
                    star <= rating
                      ? "text-amber-500 fill-amber-500"
                      : "text-default-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <TextArea
            required
            id="custom-textarea"
            aria-label="Write your legal consulting review"
            placeholder="Share a narrative review of this attorney's legal consulting quality..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full text-sm leading-6"
            rows={4}
            style={{
              resize: "vertical",
              minHeight: "100px",
              padding: "12px 16px",
              borderRadius: "12px",
            }}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              isDisabled={submitLoading}
              className={`bg-[#1D44B7] text-white text-xs font-bold rounded-xl px-5 h-10 shadow-sm transition-all ${
                submitLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#153491]"
              }`}
            >
              {submitLoading ? (
                <div className="flex items-center gap-2">
                  <div className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Posting...</span>
                </div>
              ) : (
                "Submit Audit"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400 text-xs font-medium">
          <BsInfoCircle className="size-4 flex-shrink-0" />
          <span>
            Only client retainers accepted by this attorney can publish reviews.
          </span>
        </div>
      )}

      <div className="max-h-[400px] overflow-y-auto space-y-4 pr-1.5 custom-scrollbar w-full">
        {initialReviews.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-default-200 rounded-xl bg-default-50/30">
            <p className="text-xs text-default-400 font-medium">
              No reviews recorded yet for this legal consultant.
            </p>
          </div>
        ) : (
          initialReviews.map((rev, index) => (
            <div
              key={rev._id || index}
              className="flex items-start gap-2.5 text-foreground w-full group"
            >
              <Avatar className="size-8 text-[11px] font-bold bg-neutral-200 dark:bg-neutral-800 shrink-0">
                <Avatar.Fallback>{getInitials(rev.clientName)}</Avatar.Fallback>
              </Avatar>

              <div className="flex flex-col max-w-[85%] sm:max-w-[90%]">
                <div className="bg-neutral-100 dark:bg-neutral-900 px-3 py-2 rounded-2xl border border-default-100/50">
                  <div className="flex flex-col mb-0.5">
                    <span className="text-xs font-bold text-foreground leading-tight">
                      {rev.clientName}
                    </span>
                    {/* <span className="text-[9px] text-default-400 leading-none mt-0.5">
                      {rev.clientEmail}
                    </span> */}
                  </div>
                  <p className="text-xs text-default-700 dark:text-default-300 whitespace-pre-line leading-relaxed break-words mt-1">
                    {rev.comment}
                  </p>
                </div>

                <div className="flex items-center gap-3 px-2 mt-1 text-[10px] text-default-400 font-medium">
                  <span>{formatExactDate(rev.createdAt)}</span>
                  <span>•</span>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="size-3 fill-amber-500" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
