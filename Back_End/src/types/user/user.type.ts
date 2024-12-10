import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('UserDetail')
export class UserDetailType {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  imgDisplay?: string;
}

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  secretKey: string;

  @Field()
  isDisplay: boolean;

  @Field(() => [String])
  role: string[];

  @Field(() => [String])
  position: string[];

  @Field(() => UserDetailType, { nullable: true })
  details: UserDetailType;


  @Field({ nullable: true })
  hash: string;

  @Field({ nullable: true })
  refreshToken: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
