import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Max,
  ValidateBy,
  ValidateIf,
  length,
} from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import banlist from "../utils/blocklist.json";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({
    type: "text",
  })
  firstName: string;

  @Column({
    type: "boolean",
    default: false,
  })
  status: boolean;

  @Column({
    type: "text",
    enum: ["admin", "user"],
    default: "user",
  })
  role: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({
    host_blacklist: banlist,
    require_tld: true,
  })
  @Column({
    type: "text",
    unique: true,
    primary: true,
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  // {
  //   minLength: 6,
  //   minLowercase: 1,
  // }
  @Column({
    type: "text",
  })
  password: string;
  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  balance: number;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date; // Last updated date
}
