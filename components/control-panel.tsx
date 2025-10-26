import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export default function ControlPanel({
                                         onBfs,
                                         onDfs,
                                         onReset,
                                         onNewMaze,
                                         onShowModal,
                                         onResizeGrid,
                                     }: {
    onBfs: () => void;
    onDfs: () => void;
    onReset: () => void;
    onNewMaze: () => void;
    onShowModal: () => void;
    onResizeGrid: (cols: number, rows: number) => void;
}) {
    const buttonVariants = {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
    };

    return (
        <div className="flex flex-wrap justify-center gap-2">
            <MotionButton {...buttonVariants} onClick={onBfs} variant="ghost">
                Start BFS
            </MotionButton>
            <MotionButton {...buttonVariants} onClick={onDfs} variant="ghost">
                Start DFS
            </MotionButton>
            <MotionButton {...buttonVariants} onClick={onReset} variant="ghost">
                Reset
            </MotionButton>
            <MotionButton {...buttonVariants} onClick={onNewMaze} variant="ghost">
                New Maze
            </MotionButton>
            <MotionButton {...buttonVariants} onClick={onShowModal} variant="ghost">
                About
            </MotionButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MotionButton {...buttonVariants} variant="ghost">
                        Grid Size
                    </MotionButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => onResizeGrid(10, 10)}>
                        10 × 10
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onResizeGrid(20, 20)}>
                        20 × 20
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onResizeGrid(30, 30)}>
                        30 × 30
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}