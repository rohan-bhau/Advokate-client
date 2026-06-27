"use client";

import React, { useState } from "react";
import { Card, Button, TextArea, AlertDialog, Pagination } from "@heroui/react";
import { Star, Calendar, TrashBin, Pencil } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { updateReviewAction, deleteReviewAction } from "@/lib/actions/reviews";

interface ReviewItem {
  _id: string;
  lawyerId: string;
  lawyerEmail: string;
  rating: number;
  comment: string;
  createdAt: any;
}

interface Props {
  initialReviews: ReviewItem[];
}

export default function ClientReviewsClient({ initialReviews }: Props) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const displayedReviews = reviews.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<ReviewItem | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<string | null>(null);

  const [actionLoading, setActionLoading] = useState(false);

  const formatExactDate = (dateData: any) => {
    try {
      const rawDate =
        dateData && typeof dateData === "object" && "$date" in dateData
          ? dateData.$date
          : dateData;
      return new Date(rawDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  const openEditModal = (review: ReviewItem) => {
    setCurrentReview(review);
    setEditComment(review.comment);
    setEditRating(review.rating);
    setIsEditOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReview) return;
    if (!editComment.trim()) {
      toast.error("Review comment cannot be empty.");
      return;
    }

    setActionLoading(true);
    try {
      const res = await updateReviewAction(currentReview._id, {
        rating: editRating,
        comment: editComment,
      });
      if (res) {
        toast.success("Review updated successfully.");
        setReviews((prev) =>
          prev.map((r) =>
            r._id === currentReview._id
              ? { ...r, rating: editRating, comment: editComment }
              : r,
          ),
        );
        setIsEditOpen(false);
      }
    } catch (err) {
      toast.error("Failed to update review.");
    } finally {
      setActionLoading(false);
    }
  };

  const triggerDeleteDialog = (id: string) => {
    setReviewIdToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleExecuteDelete = async () => {
    if (!reviewIdToDelete) return;
    setActionLoading(true);
    try {
      const res = await deleteReviewAction(reviewIdToDelete);
      if (res) {
        toast.success("Review removed from profile ledger.");
        const updatedReviews = reviews.filter(
          (r) => r._id !== reviewIdToDelete,
        );
        setReviews(updatedReviews);

        const newTotalPages = Math.ceil(updatedReviews.length / itemsPerPage);
        if (page > newTotalPages && newTotalPages > 0) {
          setPage(newTotalPages);
        }
      }
    } catch (err) {
      toast.error("Failed to delete review.");
    } finally {
      setActionLoading(false);
      setIsDeleteOpen(false);
      setReviewIdToDelete(null);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-xl font-bold text-[#0B3A75] dark:text-white">
          My Law Firm Reviews
        </h1>
        <p className="text-xs text-default-400 mt-1">
          Manage and update audits or consulting responses you published.
        </p>
      </div>

      {reviews.length === 0 ? (
        <Card className="text-center py-16 border border-dashed border-default-200 bg-default-50/50 rounded-2xl shadow-sm">
          <span className="text-3xl">📝</span>
          <p className="text-xs font-medium text-default-400 mt-3">
            You haven't posted any consulting reviews yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {displayedReviews.map((rev) => (
              <Card
                key={rev._id}
                className="bg-content1 border border-default-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4 hover:border-default-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col max-w-[70%]">
                      <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                        Recipient Legal Consultant
                      </span>
                      <span className="text-xs font-bold text-default-700 mt-0.5 truncate">
                        {rev.lawyerEmail}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0">
                      <Star className="size-3 fill-amber-500 text-amber-500" />{" "}
                      {rev.rating}.0
                    </div>
                  </div>

                  <div className="bg-default-50 dark:bg-default-100/5 p-3 rounded-xl border border-default-100/50 min-h-[70px]">
                    <p className="text-xs text-default-600 dark:text-default-300 whitespace-pre-line leading-relaxed break-words">
                      {rev.comment}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-default-100/60 text-default-400 text-[11px] font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    <span>{formatExactDate(rev.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => openEditModal(rev)}
                      className="h-8 min-w-8 bg-default-100 text-default-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg p-0 transition-all"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      onClick={() => triggerDeleteDialog(rev._id)}
                      className="h-8 min-w-8 bg-default-100 text-default-600 hover:bg-danger-50 hover:text-danger-600 rounded-lg p-0 transition-all"
                    >
                      <TrashBin className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center pt-4 w-full border-t border-default-100/60 mt-2 overflow-hidden">
              <Pagination className="justify-center">
                <Pagination.Content className="bg-content1 border border-default-200 rounded-xl shadow-sm flex flex-wrap items-center justify-center gap-0 max-w-max mx-auto overflow-hidden">
                  <Pagination.Item>
                    <Pagination.Previous
                      isDisabled={page === 1}
                      onPress={() => setPage((p) => Math.max(p - 1, 1))}
                      className={`px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1 font-bold transition-all ${
                        page === 1
                          ? "opacity-30 pointer-events-none text-default-300"
                          : "text-foreground hover:bg-default-100 cursor-pointer"
                      }`}
                    >
                      <Pagination.PreviousIcon className="size-4 shrink-0" />
                      <span className="hidden sm:block">Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>

                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${i}`}>
                        <Pagination.Ellipsis />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p === page}
                          onPress={() => setPage(p)}
                          className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${
                            page === p
                              ? "bg-[#1D44B7] text-white rounded-lg shadow-sm hover:bg-[#153491]"
                              : "text-default-500 hover:bg-default-100 rounded-lg"
                          }`}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ),
                  )}

                  <Pagination.Item>
                    <Pagination.Next
                      isDisabled={page === totalPages}
                      onPress={() =>
                        setPage((p) => Math.min(p + 1, totalPages))
                      }
                      className={`px-2.5 sm:px-3 py-1.5 text-xs flex items-center gap-1 font-bold transition-all ${
                        page === totalPages
                          ? "opacity-30 pointer-events-none text-default-300"
                          : "text-foreground hover:bg-default-100 cursor-pointer"
                      }`}
                    >
                      <span className="hidden sm:block">Next</span>
                      <Pagination.NextIcon className="size-4 shrink-0" />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </div>
      )}

      {isEditOpen && currentReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-content1 border border-default-100 p-6 rounded-2xl w-full max-w-md shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-foreground">
                Modify Client Feedback
              </h3>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="text-default-400 hover:text-foreground text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-default-400 block">
                  Edit Assessment Metric
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setEditRating(star)}
                      className="focus:outline-none transition-transform active:scale-95"
                    >
                      <Star
                        className={`size-5 ${star <= editRating ? "text-amber-500 fill-amber-500" : "text-default-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-default-400 block">
                  Edit Narrative Statement
                </span>
                <TextArea
                  required
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full text-xs"
                  rows={4}
                  style={{
                    resize: "vertical",
                    minHeight: "100px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="bg-default-100 text-default-600 text-xs font-bold rounded-xl h-9 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isDisabled={actionLoading}
                  className={`bg-[#1D44B7] text-white text-xs font-bold rounded-xl h-9 px-4 ${
                    actionLoading ? "opacity-70" : ""
                  }`}
                >
                  {actionLoading ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {isDeleteOpen && (
        <AlertDialog isOpen={isDeleteOpen}>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px] bg-content1 p-6 rounded-2xl border border-default-100 shadow-xl space-y-4 relative">
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(false)}
                  className="absolute right-4 top-4 text-default-400 hover:text-foreground text-xs font-bold focus:outline-none"
                >
                  ✕
                </button>

                <AlertDialog.Header className="flex items-center gap-3">
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading className="text-base font-bold text-foreground">
                    Delete review permanently?
                  </AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body>
                  <p className="text-xs text-default-500 leading-relaxed">
                    This will permanently clear your published litigation score
                    feedback statement from the profile registry. This action
                    cannot be undone.
                  </p>
                </AlertDialog.Body>

                <AlertDialog.Footer className="flex justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    onClick={() => setIsDeleteOpen(false)}
                    className="bg-default-100 text-default-600 text-xs font-bold rounded-xl h-9 px-4 hover:bg-default-200 transition-all"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleExecuteDelete}
                    className="bg-danger text-white text-xs font-bold rounded-xl h-9 px-4 hover:bg-danger-600 transition-all"
                  >
                    Delete Review
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      )}
    </div>
  );
}
